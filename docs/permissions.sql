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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Permissions; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."Permissions" (
--     id integer NOT NULL,
--     name character varying(255) NOT NULL,
--     notes character varying(255) NOT NULL,
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


ALTER TABLE public."Permissions" OWNER TO postgres;

--
-- Name: Permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Permissions_id_seq" OWNER TO postgres;

--
-- Name: Permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Permissions_id_seq" OWNED BY public."Permissions".id;


--
-- Name: Permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Permissions" ALTER COLUMN id SET DEFAULT nextval('public."Permissions_id_seq"'::regclass);


--
-- Data for Name: Permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Permissions" VALUES (1, 'can:post:branch', 'can post branch', '2020-12-01 09:23:47.217-06', '2020-12-01 09:23:47.217-06');
INSERT INTO public."Permissions" VALUES (2, 'can:get:branch', 'can get branch', '2020-12-01 09:23:57.083-06', '2020-12-01 09:23:57.083-06');
INSERT INTO public."Permissions" VALUES (3, 'can:put:branch', 'can put branch', '2020-12-02 08:50:30.63-06', '2020-12-02 08:50:30.63-06');
INSERT INTO public."Permissions" VALUES (4, 'can:delete:branch', 'can delete branch', '2020-12-01 09:24:21.661-06', '2020-12-01 09:24:21.661-06');

INSERT INTO public."Permissions" VALUES (5, 'can:delete:zone', 'can delete zone', '2020-12-01 10:12:43.868-06', '2020-12-01 10:12:43.868-06');
INSERT INTO public."Permissions" VALUES (6, 'can:get:zone', 'can get zone', '2020-12-01 10:13:00.856-06', '2020-12-01 10:13:00.856-06');
INSERT INTO public."Permissions" VALUES (7, 'can:post:zone', 'can post zone', '2020-12-01 10:13:08.462-06', '2020-12-01 10:13:08.462-06');
INSERT INTO public."Permissions" VALUES (8, 'can:put:zone', 'can put zone', '2020-12-02 06:20:57.309-06', '2020-12-02 06:20:57.309-06');

INSERT INTO public."Permissions" VALUES (9, 'can:post:fellowship', 'can post fellowship', '2020-12-04 09:05:04.083-06', '2020-12-04 09:05:04.083-06');
INSERT INTO public."Permissions" VALUES (10, 'can:put:fellowship', 'can put fellowship', '2020-12-04 09:05:17.962-06', '2020-12-04 09:05:17.962-06');
INSERT INTO public."Permissions" VALUES (11, 'can:delete:fellowship', 'can delete fellowship', '2020-12-04 09:08:08.532-06', '2020-12-04 09:08:08.532-06');
INSERT INTO public."Permissions" VALUES (12, 'can:get:fellowship', 'can get fellowship', '2020-12-04 09:08:22.174-06', '2020-12-04 09:08:22.174-06');

INSERT INTO public."Permissions" VALUES (13, 'can:get:event', 'can get event', '2020-12-04 09:19:49.929-06', '2020-12-04 09:19:49.929-06');
INSERT INTO public."Permissions" VALUES (14, 'can:put:event', 'can put event', '2020-12-04 09:20:58.208-06', '2020-12-04 09:20:58.208-06');
INSERT INTO public."Permissions" VALUES (15, 'can:post:event', 'can post event', '2020-12-04 09:21:06.848-06', '2020-12-04 09:21:06.848-06');
INSERT INTO public."Permissions" VALUES (16, 'can:delete:event', 'can delete event', '2020-12-04 09:21:14.045-06', '2020-12-04 09:21:14.045-06');

INSERT INTO public."Permissions" VALUES (17, 'can:post:category', 'can post category', '2020-12-04 09:21:38.298-06', '2020-12-04 09:21:38.298-06');
INSERT INTO public."Permissions" VALUES (18, 'can:put:category', 'can put category', '2020-12-04 09:21:48.751-06', '2020-12-04 09:21:48.751-06');
INSERT INTO public."Permissions" VALUES (19, 'can:delete:category', 'can delete category', '2020-12-04 09:21:56.711-06', '2020-12-04 09:21:56.711-06');
INSERT INTO public."Permissions" VALUES (20, 'can:get:category', 'can get category', '2020-12-04 09:22:12.667-06', '2020-12-04 09:22:12.667-06');

INSERT INTO public."Permissions" VALUES (21, 'can:get:download', 'can get download', '2020-12-04 09:23:10.031-06', '2020-12-04 09:23:10.031-06');
INSERT INTO public."Permissions" VALUES (22, 'can:post:download', 'can post download', '2020-12-04 09:23:17.597-06', '2020-12-04 09:23:17.597-06');
INSERT INTO public."Permissions" VALUES (23, 'can:put:download', 'can put download', '2020-12-04 09:23:28.404-06', '2020-12-04 09:23:28.404-06');
INSERT INTO public."Permissions" VALUES (24, 'can:delete:download', 'can delete download', '2020-12-04 09:23:43.668-06', '2020-12-04 09:23:43.668-06');

INSERT INTO public."Permissions" VALUES (25, 'can:post:preacher', 'can post preacher', '2020-12-04 09:24:31.216-06', '2020-12-04 09:24:31.216-06');
INSERT INTO public."Permissions" VALUES (26, 'can:put:preacher', 'can put preacher', '2020-12-04 09:24:45.349-06', '2020-12-04 09:24:45.349-06');
INSERT INTO public."Permissions" VALUES (27, 'can:get:preacher', 'can get preacher', '2020-12-04 09:24:53.413-06', '2020-12-04 09:24:53.413-06');
INSERT INTO public."Permissions" VALUES (28, 'can:delete:preacher', 'can delete preacher', '2020-12-04 09:25:03.063-06', '2020-12-04 09:25:03.063-06');

INSERT INTO public."Permissions" VALUES (29, 'can:post:config', 'can post config', '2020-12-04 09:25:26.467-06', '2020-12-04 09:25:26.467-06');
INSERT INTO public."Permissions" VALUES (30, 'can:put:config', 'can put config', '2020-12-04 09:25:37.699-06', '2020-12-04 09:25:37.699-06');
INSERT INTO public."Permissions" VALUES (31, 'can:delete:config', 'can delete config', '2020-12-04 09:25:55.369-06', '2020-12-04 09:25:55.369-06');
INSERT INTO public."Permissions" VALUES (32, 'can:get:config', 'can get config', '2020-12-04 09:26:00.684-06', '2020-12-04 09:26:00.684-06');

INSERT INTO public."Permissions" VALUES (33, 'can:put:user', 'can put user', '2020-12-13 06:59:53.851-06', '2020-12-13 06:59:53.851-06');
INSERT INTO public."Permissions" VALUES (34, 'can:post:user', 'can post user', '2020-12-13 07:00:06.287-06', '2020-12-13 07:00:06.287-06');
INSERT INTO public."Permissions" VALUES (35, 'can:get:user', 'can get user', '2020-12-13 07:00:17.856-06', '2020-12-13 07:00:17.856-06');
INSERT INTO public."Permissions" VALUES (36, 'can:delete:user', 'can delete user', '2020-12-13 07:00:43.509-06', '2020-12-13 07:00:43.509-06');

INSERT INTO public."Permissions" VALUES (37, 'can:put:permission', 'can put permission', '2020-12-13 06:59:53.851-06', '2020-12-13 06:59:53.851-06');
INSERT INTO public."Permissions" VALUES (38, 'can:post:permission', 'can post permission', '2020-12-13 07:00:06.287-06', '2020-12-13 07:00:06.287-06');
INSERT INTO public."Permissions" VALUES (39, 'can:get:permission', 'can get permission', '2020-12-13 07:00:17.856-06', '2020-12-13 07:00:17.856-06');
INSERT INTO public."Permissions" VALUES (40, 'can:delete:permission', 'can delete permission', '2020-12-13 07:00:43.509-06', '2020-12-13 07:00:43.509-06');

INSERT INTO public."Permissions" VALUES (41, 'can:put:role', 'can put role', '2020-12-13 06:59:53.851-06', '2020-12-13 06:59:53.851-06');
INSERT INTO public."Permissions" VALUES (42, 'can:post:role', 'can post role', '2020-12-13 07:00:06.287-06', '2020-12-13 07:00:06.287-06');
INSERT INTO public."Permissions" VALUES (43, 'can:get:role', 'can get role', '2020-12-13 07:00:17.856-06', '2020-12-13 07:00:17.856-06');
INSERT INTO public."Permissions" VALUES (44, 'can:delete:role', 'can delete role', '2020-12-13 07:00:43.509-06', '2020-12-13 07:00:43.509-06');

--
-- Name: Permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Permissions_id_seq"', 45, true);


--
-- Name: Permissions Permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_name_key" UNIQUE (name);


--
-- Name: Permissions Permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

