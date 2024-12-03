
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
