plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services")
}

android {
    namespace = "com.example.investigacionaplicada2"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.investigacionaplicada2"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    // Import the Firebase Bill of Materials (BoM)
    implementation(platform(libs.firebaseBom))

    // Add individual Firebase dependencies WITHOUT versions
    implementation("com.google.firebase:firebase-database-ktx")
    implementation("com.google.firebase:firebase-analytics-ktx")

    // Add your other dependencies from the version catalog
    implementation(libs.material)
    implementation(libs.recyclerView)
    implementation(libs.constraintLayout)

    // Add the Navigation Component dependencies
    implementation(libs.navigationFragmentKtx)
    implementation(libs.navigationUiKtx)
}
