job "methone" {
  type = "service"

  group "methone" {
    network {
      port "http" {
        to = 3000
      }
    }

    service {
      name     = "methone"
      port     = "http"
      provider = "nomad"
      tags = [
        "traefik.enable=true",
        "traefik.http.routers.methone.rule=Host(`methone.datasektionen.se`)",
        "traefik.http.routers.methone.tls.certresolver=default",
      ]
    }

    task "methone" {
      driver = "docker"

      config {
        image = var.image_tag
        ports = ["http"]
      }

      resources {
        memory = 10
      }
    }
  }
}

variable "image_tag" {
  type = string
  default = "ghcr.io/datasektionen/methone:latest"
}
