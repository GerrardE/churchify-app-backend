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
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, firstname, lastname, phone, email, zoneid, branchid, city, state, country, password, "createdAt", "updatedAt") FROM stdin;
e919b298-8cc5-4432-8861-29a87264579d	Gerrard	Ezeugwa	08137519688	ezeugwagerrard@gmail.com	1	2	77002	306	161	$2a$10$zkf.zgQrVNZ0.PsSJ.k83.CHkPvuxeAbyuwTXFFwN4CeXzLltcdUG	2021-02-05 02:32:59.332+00	2021-02-05 02:32:59.332+00
601f2054-5ac3-4e27-80fc-0dc1371633bd	Juliet	Ezeugwa	08137519688	ezeugwajuliet@gmail.com	1	1	77002	306	161	$2a$10$hOe4gjD4FyIcsqZE5co8teAuDhXxFmHBRLQMJtbsZHnfT35m.153u	2021-02-05 02:38:21.978+00	2021-02-05 02:38:21.978+00
\.


--
-- PostgreSQL database dump complete
--

