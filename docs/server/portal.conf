server {
    if ($host = portalapi.trem.org) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

  listen 80;

  server_name portalapi.trem.org www.portalapi.trem.org;

  access_log /var/log/nginx/portalapi.trem.org.access.log;
  error_log /var/log/nginx/portalapi.trem.org.error.log;

  # Redirect HTTP to HTTPS
  return 301 https://$host$request_uri;
}

server {
    # Listen HTTPS
    listen 443 ssl;
    server_name portalapi.trem.org;

    # SSL config
    ssl_certificate /etc/letsencrypt/live/portalapi.trem.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/portalapi.trem.org/privkey.pem; # managed by Certbot

    # Proxy Config
    location / {
        proxy_pass http://54.88.145.143:3000;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}

server {
    if ($host = portal.trem.org) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

  listen 80;

  server_name portal.trem.org www.portal.trem.org;

  access_log /var/log/nginx/portal.trem.org.access.log;
  error_log /var/log/nginx/portal.trem.org.error.log;

  # Redirect HTTP to HTTPS
  return 301 https://$host$request_uri;
}

server {
    # Listen HTTPS
    listen 443 ssl;
    server_name portal.trem.org;

    # SSL config
    ssl_certificate /etc/letsencrypt/live/portal.trem.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/portal.trem.org/privkey.pem; # managed by Certbot

    # Proxy Config
    location / {
        proxy_pass http://54.88.145.143:8000;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}

