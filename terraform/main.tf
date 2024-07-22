terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.41.0"
    }
  }

  required_version = "~> 1.0"
}

locals {
  resource_name = "${var.namespace}-${var.resource_tag_name}"
}

provider "aws" {
  region     = var.provider_region
  access_key = var.provider_access_key
  secret_key = var.provider_secret_key
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_key_pair" "deployer" {
  key_name   = "${var.resource_tag_name}_key"
  public_key = var.public_key
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name

  # curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  # source ~/.bashrc
  # nvm install v16.14.0 && nvm use v16.14.0
  # pm2 serve ./dist 8000 --name client --spa
  # sudo certbot --nginx -d portal.trem.org -d www.portal.trem.org
  # sudo certbot --nginx -d portalapi.trem.org -d www.portalapi.trem.org
  user_data = <<-EOF
    #!/bin/bash
    cd /home/ubuntu
    sudo apt-get update
    sudo apt-get upgrade -y
    sudo apt install nginx curl certbot python3-certbot-nginx -y
    sudo ufw enable
    sudo systemctl enable ufw
    sudo ufw allow 'Nginx Full'
    sudo ufw allow 'OpenSSH'
    sudo ufw allow 8000
    sudo ufw allow 3000
    sudo ufw delete allow 'Nginx HTTP'
    sudo touch /var/log/nginx/portal.trem.org.access.log
    sudo touch /var/log/nginx/portal.trem.org.error.log
    sudo touch /var/log/nginx/portalapi.trem.org.access.log
    sudo touch /var/log/nginx/portalapi.trem.org.error.log
    sudo chown -R $USER:$USER /var/log/nginx/
    curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
    sudo bash /tmp/nodesource_setup.sh
    sudo apt install nodejs
    npm i pm2 yarn -g
    git clone https://github.com/GerrardE/churchify-app-frontend.git
    git clone https://github.com/GerrardE/churchify-app-backend.git
    sudo chown -R $USER:$USER churchify-app-frontend
    sudo chown -R $USER:$USER churchify-app-backend
    sudo cp ./churchify-app-backend/docs/server/portal.conf /etc/nginx/conf.d/
    sudo chmod +x /etc/nginx/conf.d/portal.conf
    cp ./churchify-app-backend/.env.example ./churchify-app-backend/.env && chmod 777 ./churchify-app-backend/.env && cd ./churchify-app-backend && yarn
  EOF

  tags = {
    Name = "${var.resource_tag_name}_ec2"
  }
}

resource "aws_eip" "lb" {
  instance = aws_instance.web.id
}

resource "aws_security_group" "allow_tls" {
  name        = var.resource_tag_name
  description = "Allow TLS inbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    description      = "web access"
    from_port        = 8000
    to_port          = 8000
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "api access"
    from_port        = 3000
    to_port          = 3000
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "db access"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "ssh access"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "http access"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "TLS from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "${var.resource_tag_name}_allow_tls"
  }
}
