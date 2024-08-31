# Use the official MySQL image as the base image
FROM mysql:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_USER=harlin
ENV MYSQL_PASSWORD=1234
ENV MYSQL_DATABASE=majesticdb

# Expose port 3306 to the outside world
EXPOSE 3306

# Volume for MySQL data
VOLUME ["/var/lib/mysql"]