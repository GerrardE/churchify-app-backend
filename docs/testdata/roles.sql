
--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Roles" VALUES (1, 'super:admin', 'super admin role', '2021-12-01 09:22:48.474-06', '2021-01-01 09:22:48.474-06');
INSERT INTO public."Roles" VALUES (2, 'admin', 'admin role', '2021-12-01 09:23:17.035-06', '2021-01-01 09:23:17.035-06');
INSERT INTO public."Roles" VALUES (3, 'guest', 'guest role', '2021-12-01 09:25:26.988-06', '2021-01-01 09:24:26.988-06');


--
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 4, true);
