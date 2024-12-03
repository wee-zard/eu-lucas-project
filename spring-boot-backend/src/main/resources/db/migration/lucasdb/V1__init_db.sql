create table tb_creation_direction (
	direction_name varchar(20) not null primary key
);

create table tb_creation_country (
	country_code varchar(2) not null primary key,
	country_name varchar(100) not null
);

create table tb_creation_year (
	year int(4) not null primary key
);

create table tb_coordinate_x (
	coordinate_x int(3) not null primary key
);

create table tb_coordinate_y (
	coordinate_y int(3) not null primary key
);

create table tb_image (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	image_name varchar(50) not null,
	country_code varchar(2) not null,
	year int(4) not null,
	direction_name varchar(20) not null,
	coordinate_x int(3) not null,
	coordinate_y int(3) not null,
	foreign key(country_code) references tb_creation_country(country_code),
	foreign key(year) references tb_creation_year(year),
	foreign key(direction_name) references tb_creation_direction(direction_name),
	foreign key(coordinate_x) references tb_coordinate_x(coordinate_x),
	foreign key(coordinate_y) references tb_coordinate_y(coordinate_y)
);

create table tb_exif_key (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	exif_key_name varchar(100) not null
);

create table tb_exif_data (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	exif_value varchar(100) not null,
	exif_key_id bigint not null,
	image_id bigint not null,
	foreign key(exif_key_id) references tb_exif_key(id),
	foreign key(image_id) references tb_image(id)
);
