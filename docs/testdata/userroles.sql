--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."UserRoles" (id, userid, roleid, "createdAt", "updatedAt") VALUES (1, '1abc1be5-9948-4b5e-b6bd-7124eca6137d', 1, '2021-02-05 03:00:29.187+00', '2021-02-05 03:00:29.187+00');


--
-- Name: UserRoles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserRoles_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

