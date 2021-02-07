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
-- Name: Zones; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."Zones" (
--     id integer NOT NULL,
--     name character varying(255) NOT NULL,
--     country integer NOT NULL,
--     notes character varying(255) NOT NULL,
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


-- ALTER TABLE public."Zones" OWNER TO postgres;

--
-- Name: Zones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public."Zones_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


ALTER TABLE public."Zones_id_seq" OWNER TO postgres;

--
-- Name: Zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Zones_id_seq" OWNED BY public."Zones".id;


--
-- Name: Zones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Zones" ALTER COLUMN id SET DEFAULT nextval('public."Zones_id_seq"'::regclass);


--
-- Data for Name: Zones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Zones" VALUES (1, 'Headquarters Zone', 161, 'TREM International Headquarters Zone', '2020-11-29 05:35:01.817-06', '2020-11-29 05:35:01.817-06');
INSERT INTO public."Zones" VALUES (2, 'North Axis', 161, 'The North Axis of TREM', '2020-12-02 05:50:11.173-06', '2020-12-02 08:51:33.252-06');


--
-- Name: Zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Zones_id_seq"', 3, true);


--
-- Name: Zones Zones_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Zones"
--     ADD CONSTRAINT "Zones_name_key" UNIQUE (name);


--
-- Name: Zones Zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Zones"
--     ADD CONSTRAINT "Zones_pkey" PRIMARY KEY (id);


--
-- Name: Zones Zones_country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Zones"
--     ADD CONSTRAINT "Zones_country_fkey" FOREIGN KEY (country) REFERENCES public."Countries"(id);


--
-- PostgreSQL database dump complete
--

