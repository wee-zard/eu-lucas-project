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
	id bigint AUTO_INCREMENT PRIMARY KEY,
	exif_key_name varchar(100) not null
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

create table tb_plant_name (
	plant_scientific_name varchar(200) PRIMARY KEY
);

create table tb_plant_common_name (
	plant_scientific_name varchar(200) not null,
	plant_common_name varchar(200) not null,
	foreign key(plant_scientific_name) references tb_plant_name(plant_scientific_name),
	PRIMARY KEY(plant_scientific_name, plant_common_name)
);

create table tb_plant_species (
	plant_scientific_name varchar(200) PRIMARY KEY,
	foreign key(plant_scientific_name) references tb_plant_name(plant_scientific_name)
);

create table tb_plant (
	plant_scientific_name varchar(200) PRIMARY KEY,
	is_plant_invasive TINYINT(1) not null,
	plant_species_name varchar(200) null,
	foreign key(plant_scientific_name) references tb_plant_name(plant_scientific_name),
	foreign key(plant_species_name) references tb_plant_species(plant_scientific_name)
);

create table tb_plant_in_image (
	image_plant_name varchar(200) not null,
	image_id bigint not null,
	foreign key(image_id) references tb_image(id),
	foreign key(image_plant_name) references tb_plant(plant_scientific_name),
	PRIMARY KEY(image_plant_name, image_id)
);

create table tb_exif_data (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	exif_value varchar(100) not null,
	exif_key_id bigint not null,
	image_id bigint not null,
	foreign key(exif_key_id) references tb_exif_key(id),
	foreign key(image_id) references tb_image(id)
);

create table tb_status (
	status_id bigint PRIMARY KEY,
	status_name varchar(100) not null
);

create table tb_user_root (
	id bigint AUTO_INCREMENT PRIMARY KEY,
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
	foreign key(user_student_id) references tb_user_root(id)
);

create table tb_user_professor (
	user_professor_id bigint PRIMARY KEY,
	foreign key(user_professor_id) references tb_user_root(id)
);

create table tb_user_admin (
	user_admin_id bigint PRIMARY KEY,
	foreign key(user_admin_id) references tb_user_root(id)
);

create table tb_procedure (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	name varchar(200) not null,
	init_user_id bigint not null,
	foreign key(init_user_id) references tb_user_root(id),
	UNIQUE(name)
);

create table tb_procedure_log (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	procedure_id bigint not null,
	created_at datetime not null,
	image_to_analyse bigint not null,
	log_init_user_id bigint not null,
	foreign key(log_init_user_id) references tb_user_root(id),
	foreign key(procedure_id) references tb_procedure(id),
	foreign key(image_to_analyse) references tb_image(id)
);

create table tb_procedure_log_params (
	procedure_log_id bigint not null,
	procedure_param_name varchar(50) not null,
	foreign key(procedure_log_id) references tb_procedure_log(id),
	PRIMARY KEY(procedure_log_id, procedure_param_name)
);

create table tb_bounding_box(
	id bigint AUTO_INCREMENT PRIMARY KEY,
	probability_of_detection int(3) null,
	min_coordinate_x int(4) not null,
	min_coordinate_y int(4) not null,
	max_coordinate_x int(4) not null,
	max_coordinate_y int(4) not null,
	is_homogenous TINYINT(1) not null,
	plant_scientific_name varchar(200) not null,
	image_to_analyse bigint not null,
	procedure_log_id bigint not null,
	foreign key(procedure_log_id) references tb_procedure_log(id),
	foreign key(image_to_analyse) references tb_image(id),
	foreign key(plant_scientific_name) references tb_plant(plant_scientific_name)
);

INSERT INTO tb_status values(1, "Pending");
INSERT INTO tb_status values(2, "Blocked");
INSERT INTO tb_status values(3, "Activated");

insert into tb_creation_year values(2008);
insert into tb_creation_year values(2012);
insert into tb_creation_year values(2015);
insert into tb_creation_year values(2018);
insert into tb_creation_year values(2021);
insert into tb_creation_year values(2024);