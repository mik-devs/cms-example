# Base Image (PHP 8.5 para tumugma sa local setup mo)
FROM php:8.5-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Use MLocati's installer for PHP extensions (Prevents OOM crashes)
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_pgsql pgsql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy existing application directory contents
COPY . /app

# Set memory limit for Vite build (Prevents OOM crashes)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies and build assets
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Cache clear and storage link
RUN php artisan optimize:clear || true
RUN php artisan storage:link || true

# Expose ports
EXPOSE 8000
EXPOSE 8080

# Start Reverb in the background AND Laravel using PHP's built-in server
CMD php artisan reverb:start --host=0.0.0.0 --port=8080 & php -S 0.0.0.0:${PORT:-8000} -t public