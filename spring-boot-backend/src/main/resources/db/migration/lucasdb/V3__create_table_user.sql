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

INSERT INTO tb_status values(1, "Pending");
INSERT INTO tb_status values(2, "Blocked");
INSERT INTO tb_status values(3, "Activated");
