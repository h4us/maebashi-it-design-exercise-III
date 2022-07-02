New-Item -Force -Path "out" -ItemType Directory

Copy-Item -Force -Destination out -Recurse -Path ("index.html","dist","scenes","_streamingAssets")