insert into public.devices(id, name) values(1, 'farm1');
insert into public.devices(id, name) values(2, 'farm2');

insert into public.device_sensors(id, device_id) values(1, 1);
insert into public.device_sensors(id, device_id) values(2, 2);

insert into public.device_states(id, device_id) values(1, 1);
insert into public.device_states(id, device_id) values(2, 2);