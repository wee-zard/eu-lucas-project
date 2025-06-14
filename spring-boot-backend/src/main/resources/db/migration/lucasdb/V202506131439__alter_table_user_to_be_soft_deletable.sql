alter table tb_user_root add column deleted_at Timestamp;
alter table tb_user_root add column deleted_by bigint;
alter table tb_user_root add column created_at Timestamp;
alter table tb_user_root add column updated_at Timestamp;
