--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

--
-- Name: Configs; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."Configs" (
--     id integer NOT NULL,
--     name character varying(255) NOT NULL,
--     type character varying(255) NOT NULL,
--     config jsonb[] NOT NULL,
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


-- ALTER TABLE public."Configs" OWNER TO postgres;

--
-- Name: Configs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public."Configs_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER TABLE public."Configs_id_seq" OWNER TO postgres;

--
-- Name: Configs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Configs_id_seq" OWNED BY public."Configs".id;


--
-- Name: Configs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Configs" ALTER COLUMN id SET DEFAULT nextval('public."Configs_id_seq"'::regclass);


--
-- Data for Name: Configs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Configs" VALUES (1, 'categories', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"name\", \"unique\": true, \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:27:30.835-06', '2020-11-18 06:27:30.835-06');
INSERT INTO public."Configs" VALUES (2, 'events', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true}","{\"field\": \"name\", \"unique\": true, \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"month\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"month is required\"}}","{\"field\": \"year\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"year is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:28:58.064-06', '2020-11-18 06:28:58.064-06');
INSERT INTO public."Configs" VALUES (3, 'zones', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"name\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"country\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"country is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:29:44.897-06', '2020-11-18 06:29:44.897-06');
INSERT INTO public."Configs" VALUES (4, 'downloads', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"categoryid\", \"datatype\": \"integer\", \"required\": true}","{\"field\": \"month\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"month is required\"}}","{\"field\": \"year\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"year is required\"}}","{\"field\": \"url\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"url is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"name\", \"unique\": true, \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:31:23.969-06', '2020-11-18 06:31:23.969-06');
INSERT INTO public."Configs" VALUES (5, 'fellowships', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"country\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"country is required\"}}","{\"field\": \"state\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"state is required\"}}","{\"field\": \"city\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"city is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"name\", \"unique\": true, \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"address\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"address is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:34:27.312-06', '2020-11-18 06:34:27.312-06');
INSERT INTO public."Configs" VALUES (6, 'freport', 'report', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"fellowshipid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"fellowship is required\"}}","{\"field\": \"newcells\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no. newcells is required\"}}","{\"field\": \"totalcells\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"totalcells is required\"}}","{\"field\": \"attendance\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"attendance is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:24:15.815-06', '2020-12-06 09:52:47.499-06');
INSERT INTO public."Configs" VALUES (7, 'membership', 'report', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"adults\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no. adults is required\"}}","{\"field\": \"children\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no. children is required\"}}","{\"field\": \"tithers\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no. tithers is required\"}}","{\"field\": \"newmembers\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no of newmembers is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:25:50.54-06', '2020-12-06 09:59:54.394-06');
INSERT INTO public."Configs" VALUES (8, 'attendance', 'report', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"eventid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"event is required\"}}","{\"field\": \"preacherid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"preacher is required\"}}","{\"field\": \"women\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no of women is required\"}}","{\"field\": \"men\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no of men is required\"}}","{\"field\": \"children\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no of children is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": false, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:22:43.683-06', '2020-12-06 09:47:49.119-06');
INSERT INTO public."Configs" VALUES (9, 'group', 'report', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"cmf\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"cmf is required\"}}","{\"field\": \"cwf\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"cwf is required\"}}","{\"field\": \"cyf\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"cyf is required\"}}","{\"field\": \"rcf\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"rcf is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:25:06.979-06', '2020-12-06 09:56:42.554-06');
INSERT INTO public."Configs" VALUES (10, 'training', 'report', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"converts\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no. converts is required\"}}","{\"field\": \"trainees\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"no. trainees is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:26:43.278-06', '2020-12-06 10:12:21.205-06');
INSERT INTO public."Configs" VALUES (11, 'permissions', 'setting', '{"{\"field\": \"name\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-12-20 11:51:16.502-06', '2020-12-20 11:51:16.502-06');
INSERT INTO public."Configs" VALUES (12, 'activity', 'report', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"council\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"council is required\"}}","{\"field\": \"special\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"special is required\"}}","{\"field\": \"project\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"project is required\"}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:20:48.274-06', '2020-12-06 12:49:08.829-06');
INSERT INTO public."Configs" VALUES (13, 'preachers', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"country\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"country is required\"}}","{\"field\": \"state\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"state is required\"}}","{\"field\": \"city\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"city is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"firstname\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"firstname is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"lastname\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"lastname is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"address\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"address is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:45:58.137-06', '2020-11-18 06:45:58.137-06');
INSERT INTO public."Configs" VALUES (14, 'branches', 'setting', '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}","{\"field\": \"country\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"country is required\"}}","{\"field\": \"state\", \"unique\": true, \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"state is required\"}}","{\"field\": \"city\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"city is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"address\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"address is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"name\", \"unique\": true, \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-11-18 06:56:23.831-06', '2020-11-18 06:56:23.831-06');
INSERT INTO public."Configs" VALUES (15, 'users', 'setting', '{"{\"field\": \"country\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"country is required\"}}","{\"field\": \"state\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"state is required\"}}","{\"field\": \"zoneid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"zone is required\"}}","{\"field\": \"branchid\", \"datatype\": \"integer\", \"required\": true, \"validation\": {\"required\": \"branch is required\"}}","{\"field\": \"firstname\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"firstname is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"lastname\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"lastname is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"phone\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"phone is required\", \"maxLength\": {\"value\": 20, \"message\": \"max. of 20 digits required\"}, \"minLength\": {\"value\": 3, \"message\": \"min. of 3 digits required\"}}}","{\"field\": \"email\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"email is required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}","{\"field\": \"password\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"password is required\", \"minLength\": {\"value\": 10, \"message\": \"min. of 10 characters required\"}}}","{\"field\": \"confirm password\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"confirm password is required\", \"minLength\": {\"value\": 10, \"message\": \"min. of 10 characters required\"}}}"}', '2020-11-18 06:51:48.416-06', '2020-12-06 10:20:39.065-06');
INSERT INTO public."Configs" VALUES (16, 'roles', 'setting', '{"{\"field\": \"name\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"name is required\", \"minLength\": {\"value\": 2, \"message\": \"min. of 2 characters required\"}}}","{\"field\": \"notes\", \"datatype\": \"string\", \"required\": true, \"validation\": {\"required\": \"notes are required\", \"minLength\": {\"value\": 5, \"message\": \"min. of 5 characters required\"}}}"}', '2020-12-20 11:52:15.13-06', '2020-12-20 11:52:15.13-06');


--
-- Name: Configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Configs_id_seq"', 17, true);


--
-- Name: Configs Configs_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Configs"
-- ADD CONSTRAINT "Configs_name_key" UNIQUE (name);


--
-- Name: Configs Configs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Configs"
--     ADD CONSTRAINT "Configs_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

