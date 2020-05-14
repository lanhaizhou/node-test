use myblog;

-- 插入 
-- insert into users(username,`password`,realname) values('zhangsan','123','张三');
-- insert into users(username,`password`,realname) values('lisi','456','李四');

-- 查询 
select * from users;
-- select id,username from users;
-- select * from users where username='zhangsan';
-- select * from users where username='zhangsan' and `password`='123';
-- select * from users where username='zhangsan' or `password`='456';
-- select * from users where username like '%zhang%';
-- select * from users order by id;
-- select * from users order by id desc;

-- 更新
-- SET SQL_SAFE_UPDATES = 0;
-- update users set realname='李四' where username='lisi';
-- update users set password='87eafc68b35a364908a4bf071cbd8206' where username='zhangsan';
-- update users set password='5ab8beaa1a60fa7f2554acf288aff1d0' where username='lisi';

-- 删除
-- delete from users where username='lisi';

-- update users set status='0' where username='lisi';

-- insert into blogs (title,content,createtime,author) values('标题B','内容B',1586696370216,'lisi');
-- select * from blogs;

-- 查询mysql版本
-- select version();

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'blue123456';

-- select * from blogs where 1=1 order by createtime desc


-- sql注入
-- select username,realname from users where username='zhangsan'-- ' and password='123'

 












