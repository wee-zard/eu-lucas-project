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
