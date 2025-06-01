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
	CONSTRAINT tb_image_ibfk_1 foreign key(country_code) references tb_creation_country(country_code) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_image_ibfk_2 foreign key(year) references tb_creation_year(year) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_image_ibfk_3 foreign key(direction_name) references tb_creation_direction(direction_name) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_image_ibfk_4 foreign key(coordinate_x) references tb_coordinate_x(coordinate_x) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_image_ibfk_5 foreign key(coordinate_y) references tb_coordinate_y(coordinate_y) ON UPDATE CASCADE ON DELETE CASCADE
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
	CONSTRAINT tb_exif_data_ibfk_1 foreign key(exif_key_id) references tb_exif_key(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_exif_data_ibfk_2 foreign key(image_id) references tb_image(id) ON UPDATE CASCADE ON DELETE CASCADE
);
