<?php

require 'vendor/autoload.php';

use React\Http\HttpServer;
use React\Http\Message\Response;
use Psr\Http\Message\ServerRequestInterface;
use React\EventLoop\Loop;
use React\MySQL\Factory;
use React\Promise\Promise;

// Configuracion de la base de datos
$dbConfig = 'mysql://root:@localhost/investigacionbd';
$factory = new Factory();
$db = $factory->createLazyConnection($dbConfig);

//crear el loop
$loop = Loop::get();

//crear el servidor HTTP
$server = new HttpServer(function (ServerRequestInterface $request) use ($db) {
    // las cabeceras de las respuesta
    $headers = [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type',
        'Content-Type' => 'application/json'
    ];

   // manipular las cabeceras de ka respuesta
    if ($request->getMethod() === 'OPTIONS') {
        return new Response(200, $headers);
    }

    //obtener la ruta y el metodo de la peticion
    $path = $request->getUri()->getPath();
    $method = $request->getMethod();

    // API routes
    if (strpos($path, '/api') === 0) {
        // Contact form submission
        if ($path === '/api/contact' && $method === 'POST') {
            return handleContactForm($request, $db, $headers);
        }
        
        // operacion crud
        if ($path === '/api/items' && $method === 'GET') {
            return getAllItems($db, $headers);
        }
        
        if ($path === '/api/items' && $method === 'POST') {
            return createItem($request, $db, $headers);
        }
        
        if (preg_match('/^\/api\/items\/(\d+)$/', $path, $matches) && $method === 'GET') {
            $id = $matches[1];
            return getItem($id, $db, $headers);
        }
        
        if (preg_match('/^\/api\/items\/(\d+)$/', $path, $matches) && $method === 'PUT') {
            $id = $matches[1];
            return updateItem($id, $request, $db, $headers);
        }
        
        if (preg_match('/^\/api\/items\/(\d+)$/', $path, $matches) && $method === 'DELETE') {
            $id = $matches[1];
            return deleteItem($id, $db, $headers);
        }
    }

    // no encontrada
    return new Response(
        404,
        $headers,
        json_encode(['error' => 'Not found'])
    );
});

// manejar el formulario de contacto
function handleContactForm(ServerRequestInterface $request, $db, $headers) {
    return new Promise(function ($resolve, $reject) use ($request, $db, $headers) {
        $data = json_decode((string) $request->getBody(), true);
        
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
            $resolve(new Response(
                400,
                $headers,
                json_encode(['error' => 'Missing required fields'])
            ));
            return;
        }
        
        $name = $data['name'];
        $email = $data['email'];
        $message = $data['message'];
        
        $query = "INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())";
        
        $db->query($query, [$name, $email, $message])
            ->then(
                function () use ($headers, $resolve) {
                    $resolve(new Response(
                        201,
                        $headers,
                        json_encode(['success' => true, 'message' => 'Contact form submitted successfully'])
                    ));
                },
                function (\Exception $error) use ($headers, $resolve) {
                    $resolve(new Response(
                        500,
                        $headers,
                        json_encode(['error' => 'Database error: ' . $error->getMessage()])
                    ));
                }
            );
    });
}

//obtener todos los items
function getAllItems($db, $headers) {
    return new Promise(function ($resolve, $reject) use ($db, $headers) {
        $db->query('SELECT * FROM items ORDER BY id DESC')
            ->then(
                function ($result) use ($headers, $resolve) {
                    $resolve(new Response(
                        200,
                        $headers,
                        json_encode($result->resultRows)
                    ));
                },
                function (\Exception $error) use ($headers, $resolve) {
                    $resolve(new Response(
                        500,
                        $headers,
                        json_encode(['error' => 'Database error: ' . $error->getMessage()])
                    ));
                }
            );
    });
}

// obtener un item por id
function getItem($id, $db, $headers) {
    return new Promise(function ($resolve, $reject) use ($id, $db, $headers) {
        $db->query('SELECT * FROM items WHERE id = ?', [$id])
            ->then(
                function ($result) use ($headers, $resolve, $id) {
                    if (count($result->resultRows) === 0) {
                        $resolve(new Response(
                            404,
                            $headers,
                            json_encode(['error' => 'Item not found'])
                        ));
                        return;
                    }
                    
                    $resolve(new Response(
                        200,
                        $headers,
                        json_encode($result->resultRows[0])
                    ));
                },
                function (\Exception $error) use ($headers, $resolve) {
                    $resolve(new Response(
                        500,
                        $headers,
                        json_encode(['error' => 'Database error: ' . $error->getMessage()])
                    ));
                }
            );
    });
}

// crear un item
function createItem(ServerRequestInterface $request, $db, $headers) {
    return new Promise(function ($resolve, $reject) use ($request, $db, $headers) {
        $data = json_decode((string) $request->getBody(), true);
        
        if (!isset($data['title']) || !isset($data['description'])) {
            $resolve(new Response(
                400,
                $headers,
                json_encode(['error' => 'Missing required fields'])
            ));
            return;
        }
        
        $title = $data['title'];
        $description = $data['description'];
        
        $query = "INSERT INTO items (title, description, created_at) VALUES (?, ?, NOW())";
        
        $db->query($query, [$title, $description])
            ->then(
                function ($result) use ($db, $headers, $resolve) {
                    $id = $result->insertId;
                    
                    $db->query('SELECT * FROM items WHERE id = ?', [$id])
                        ->then(
                            function ($result) use ($headers, $resolve) {
                                $resolve(new Response(
                                    201,
                                    $headers,
                                    json_encode($result->resultRows[0])
                                ));
                            },
                            function (\Exception $error) use ($headers, $resolve) {
                                $resolve(new Response(
                                    500,
                                    $headers,
                                    json_encode(['error' => 'Database error: ' . $error->getMessage()])
                                ));
                            }
                        );
                },
                function (\Exception $error) use ($headers, $resolve) {
                    $resolve(new Response(
                        500,
                        $headers,
                        json_encode(['error' => 'Database error: ' . $error->getMessage()])
                    ));
                }
            );
    });
}

//actualizar un itemss
function updateItem($id, ServerRequestInterface $request, $db, $headers) {
    return new Promise(function ($resolve, $reject) use ($id, $request, $db, $headers) {
        $data = json_decode((string) $request->getBody(), true);
        
        if (!isset($data['title']) || !isset($data['description'])) {
            $resolve(new Response(
                400,
                $headers,
                json_encode(['error' => 'Missing required fields'])
            ));
            return;
        }
        
        $title = $data['title'];
        $description = $data['description'];
        
        $query = "UPDATE items SET title = ?, description = ?, updated_at = NOW() WHERE id = ?";
        
        $db->query($query, [$title, $description, $id])
            ->then(
                function ($result) use ($db, $headers, $resolve, $id) {
                    if ($result->affectedRows === 0) {
                        $resolve(new Response(
                            404,
                            $headers,
                            json_encode(['error' => 'Item not found'])
                        ));
                        return;
                    }
                    
                    $db->query('SELECT * FROM items WHERE id = ?', [$id])
                        ->then(
                            function ($result) use ($headers, $resolve) {
                                $resolve(new Response(
                                    200,
                                    $headers,
                                    json_encode($result->resultRows[0])
                                ));
                            },
                            function (\Exception $error) use ($headers, $resolve) {
                                $resolve(new Response(
                                    500,
                                    $headers,
                                    json_encode(['error' => 'Database error: ' . $error->getMessage()])
                                ));
                            }
                        );
                },
                function (\Exception $error) use ($headers, $resolve) {
                    $resolve(new Response(
                        500,
                        $headers,
                        json_encode(['error' => 'Database error: ' . $error->getMessage()])
                    ));
                }
            );
    });
}

// eliminar item
function deleteItem($id, $db, $headers) {
    return new Promise(function ($resolve, $reject) use ($id, $db, $headers) {
        $db->query('DELETE FROM items WHERE id = ?', [$id])
            ->then(
                function ($result) use ($headers, $resolve) {
                    if ($result->affectedRows === 0) {
                        $resolve(new Response(
                            404,
                            $headers,
                            json_encode(['error' => 'Item not found'])
                        ));
                        return;
                    }
                    
                    $resolve(new Response(
                        200,
                        $headers,
                        json_encode(['success' => true, 'message' => 'Item deleted successfully'])
                    ));
                },
                function (\Exception $error) use ($headers, $resolve) {
                    $resolve(new Response(
                        500,
                        $headers,
                        json_encode(['error' => 'Database error: ' . $error->getMessage()])
                    ));
                }
            );
    });
}

// inicializar el servidor
$socket = new \React\Socket\SocketServer('0.0.0.0:8080');
$server->listen($socket);

echo "Server running at http://localhost:8080\n";

//mantener el servidor en ejecucion
$loop->run();