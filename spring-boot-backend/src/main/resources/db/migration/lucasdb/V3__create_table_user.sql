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
	CONSTRAINT tb_user_root_ibfk_1 foreign key(status_id) references tb_status(status_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_user_student (
	user_student_id bigint PRIMARY KEY,
	CONSTRAINT tb_user_student_ibfk_1 foreign key(user_student_id) references tb_user_root(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_user_professor (
	user_professor_id bigint PRIMARY KEY,
	CONSTRAINT tb_user_professor_ibfk_1 foreign key(user_professor_id) references tb_user_root(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_user_admin (
	user_admin_id bigint PRIMARY KEY,
	CONSTRAINT tb_user_admin_ibfk_1 foreign key(user_admin_id) references tb_user_root(id) ON UPDATE CASCADE ON DELETE CASCADE
);
