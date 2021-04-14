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
-- Name: States; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."States" (
--     id integer NOT NULL,
--     name character varying(255),
--     country_id integer NOT NULL,
--     country_code character varying(255),
--     fips_code character varying(255),
--     iso2 character varying(255),
--     flag integer,
--     "wikiDataId" character varying(255),
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


-- ALTER TABLE public."States" OWNER TO postgres;

--
-- Name: States_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public."States_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


--
-- Name: States_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."States_id_seq" OWNED BY public."States".id;


--
-- Name: States id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."States" ALTER COLUMN id SET DEFAULT nextval('public."States_id_seq"'::regclass);


--
-- Data for Name: States; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."States" VALUES (1, 'La Massana', 1, 'AD', '04', '04', 1, 'Q24276', '2019-10-05 17:48:37-05', '2019-10-05 17:48:37-05');

--
-- Name: States_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."States_id_seq"', 2, false);


--
-- Name: States States_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."States"
--     ADD CONSTRAINT "States_pkey" PRIMARY KEY (id);


--
-- Name: States States_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."States"
--     ADD CONSTRAINT "States_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Countries"(id);


--
-- PostgreSQL database dump complete
--

