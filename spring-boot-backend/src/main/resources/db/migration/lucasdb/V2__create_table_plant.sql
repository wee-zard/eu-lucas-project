create table tb_plant_name (
	plant_scientific_name varchar(200) PRIMARY KEY
);

create table tb_plant_common_name (
	plant_scientific_name varchar(200) not null,
	plant_common_name varchar(200) not null,
	CONSTRAINT tb_plant_common_name_ibfk_1 foreign key(plant_scientific_name) references tb_plant_name(plant_scientific_name) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(plant_scientific_name, plant_common_name)
);

create table tb_plant_species (
	plant_scientific_name varchar(200) PRIMARY KEY,
	CONSTRAINT tb_plant_species_ibfk_1 foreign key(plant_scientific_name) references tb_plant_name(plant_scientific_name) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_plant (
	plant_scientific_name varchar(200) PRIMARY KEY,
	is_plant_invasive TINYINT(1) not null,
	plant_species_name varchar(200) null,
	CONSTRAINT tb_plant_ibfk_1 foreign key(plant_scientific_name) references tb_plant_name(plant_scientific_name) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_plant_ibfk_2 foreign key(plant_species_name) references tb_plant_species(plant_scientific_name) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_plant_in_image (
	image_plant_name varchar(200) not null,
	image_id bigint not null,
	CONSTRAINT tb_plant_in_image_ibfk_1 foreign key(image_id) references tb_image(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_plant_in_image_ibfk_2 foreign key(image_plant_name) references tb_plant(plant_scientific_name) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(image_plant_name, image_id)
);
