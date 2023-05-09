# Monopoly
 

# Set-up your Xampp:
## The file httpd.conf ("../xampp/apache/conf/httpd.conf):
Change **DocumentRoot** [*line ~ 252*] to: **DocumentRoot "YOUR_FILES/Monopoly/Interface/"**\
Change **Directory** [*line ~ 253*] to: **<Directory "YOUR_FILES/Monopoly/Interface/">**

# Set-up the database:
## 1. PHPMyAdmin > Create Database named "monopoly"
## 2. Execute the MySQL code inside "/Database/db.sql"
