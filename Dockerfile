# Ginamit ang PHP 8.4 para mas malapit sa local setup mo
FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip

# I-install ang Node.js 20 gamit ang NodeSource (Hindi ang lumang apt-get version)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions (PostgreSQL at MySQL)
RUN docker-php-ext-install pdo_pgsql pgsql pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy existing application directory contents
COPY . /app

# I-set ang memory limit para hindi mag-crash sa OOM (Out of Memory) ang Vite
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies and build assets
RUN composer install --no-dev --optimize-autoloader
# Gamitin ang npm install imbes na npm ci para iwas lockfile mismatch
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Expose ports
EXPOSE 8000
EXPOSE 8080

# Start Reverb and Laravel
CMD php artisan reverb:start --host=0.0.0.0 --port=8080 & php artisan serve --host=0.0.0.0 --port=${PORT:-8000}