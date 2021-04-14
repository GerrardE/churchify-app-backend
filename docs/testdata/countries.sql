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
-- Name: Countries; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."Countries" (
--     id integer NOT NULL,
--     name character varying(255),
--     iso3 character varying(255),
--     iso2 character varying(255),
--     phonecode character varying(255),
--     capital character varying(255),
--     currency character varying(255),
--     native character varying(255),
--     region character varying(255),
--     subregion character varying(255),
--     emoji character varying(255),
--     "emojiU" character varying(255),
--     flag integer,
--     "wikiDataId" character varying(255),
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


ALTER TABLE public."Countries" OWNER TO postgres;

--
-- Name: Countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public."Countries_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


ALTER TABLE public."Countries_id_seq" OWNER TO postgres;

--
-- Name: Countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Countries_id_seq" OWNED BY public."Countries".id;


--
-- Name: Countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries" ALTER COLUMN id SET DEFAULT nextval('public."Countries_id_seq"'::regclass);


--
-- Data for Name: Countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Countries" VALUES (1, 'Andorra', 'AND', 'AD', '1', 'Andorra la Vella', 'EUR', 'Andorra', 'Europe', 'Southern Europe', '🇦🇩', 'U+1F1E6 U+1F1E9', 1, 'Q228', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');

--
-- Name: Countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Countries_id_seq"', 2, false);


--
-- Name: Countries Countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Countries"
--     ADD CONSTRAINT "Countries_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

