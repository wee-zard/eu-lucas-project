
USE lucasdb;
create table creation_direction (
	direction_name varchar(20) not null primary key
);

create table creation_country (
	country_code varchar(2) not null primary key,
	country_name varchar(100) not null
);

create table creation_year (
	year int(4) not null primary key
);

create table exif_key (
	exif_code bigint AUTO_INCREMENT PRIMARY KEY,
	exif_key_name varchar(100) not null
);

create table image (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	image_name varchar(50) not null,
	gps_longitude_circle int(3) not null,
	gps_latitude_circle int(3) not null,
	country_code varchar(2) not null,
	year int(4) not null,
	direction_name varchar(20) not null,
	foreign key(country_code) references creation_country(country_code),
	foreign key(year) references creation_year(year),
	foreign key(direction_name) references creation_direction(direction_name)
);

create table exif_data (
	exif_id bigint AUTO_INCREMENT PRIMARY KEY,
	exif_value varchar(100) not null,
	exif_key_id bigint not null,
	image_id bigint not null,
	foreign key(exif_key_id) references exif_key(exif_code),
	foreign key(image_id) references image(id)
);