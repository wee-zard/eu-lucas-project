
USE lucasdb;
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

create table tb_exif_key (
	exif_code bigint AUTO_INCREMENT PRIMARY KEY,
	exif_key_name varchar(100) not null
);

create table tb_coordinate_x (
	coordinate_x int(3) not null primary key
);

create table tb_coordinate_Y (
	coordinate_y int(3) not null primary key
);

create table tb_image (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	image_name varchar(50) not null,
	coordinate_x int(3) not null,
	coordinate_y int(3) not null,
	country_code varchar(2) not null,
	year int(4) not null,
	direction_name varchar(20) not null,
	foreign key(country_code) references tb_creation_country(country_code),
	foreign key(year) references tb_creation_year(year),
	foreign key(direction_name) references tb_creation_direction(direction_name),
	foreign key(coordinate_x) references tb_coordinate_x(coordinate_x),
	foreign key(coordinate_y) references tb_coordinate_y(coordinate_y)
);

create table tb_exif_data (
	exif_id bigint AUTO_INCREMENT PRIMARY KEY,
	exif_value varchar(100) not null,
	exif_key_id bigint not null,
	image_id bigint not null,
	foreign key(exif_key_id) references tb_exif_key(exif_code),
	foreign key(image_id) references tb_image(id)
);

create table tb_status (
	status_id bigint PRIMARY KEY,
	status_name varchar(100) not null
);

create table tb_user_root (
	user_id bigint AUTO_INCREMENT PRIMARY KEY,
	auth_token varchar(256) null,
	/**
	 * "There is a length limit on email addresses. 
	 * That limit is a maximum of 64 characters (octets) in the "local part" (before the "@") 
	 * and a maximum of 255 characters (octets) in the domain part (after the "@")
	 * for a total length of 1155 characters.
	 */
	email_address varchar(1155) not null,
	username varchar(100) null,
	creation_time Timestamp,
	status_id bigint not null,
	foreign key(status_id) references tb_status(status_id)
);

create table tb_user_student (
	user_student_id bigint PRIMARY KEY,
	foreign key(user_student_id) references tb_user_root(user_id)
);

create table tb_user_professor (
	user_professor_id bigint PRIMARY KEY,
	foreign key(user_professor_id) references tb_user_root(user_id)
);

create table tb_user_admin (
	user_admin_id bigint PRIMARY KEY,
	foreign key(user_admin_id) references tb_user_root(user_id)
);

INSERT INTO tb_status values(1, "Pending");
INSERT INTO tb_status values(2, "Blocked");
INSERT INTO tb_status values(3, "Activated");