# This Dockerfile sets up a MySQL container with an initial database schema and data.
FROM mysql 

# Expose port 3306 for MySQL connections
EXPOSE 3306

# Copy the SQL initialization script into the Docker container
COPY ./initdb.sql /docker-entrypoint-initdb.d/
