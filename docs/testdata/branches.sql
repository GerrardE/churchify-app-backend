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
-- Name: Branches; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."Branches" (
--     id integer NOT NULL,
--     zoneid integer NOT NULL,
--     country integer NOT NULL,
--     city integer NOT NULL,
--     address character varying(255) NOT NULL,
--     state integer NOT NULL,
--     name character varying(255) NOT NULL,
--     notes character varying(255) NOT NULL,
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


-- ALTER TABLE public."Branches" OWNER TO postgres;

--
-- Name: Branches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public."Branches_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


--
-- Name: Branches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Branches_id_seq" OWNED BY public."Branches".id;


--
-- Name: Branches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branches" ALTER COLUMN id SET DEFAULT nextval('public."Branches_id_seq"'::regclass);


--
-- Data for Name: Branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Branches" VALUES (1, 1, 1, 1, 'Anthony Oke Expressway', 1, 'Headquarters', 'TREM International Headquarters', '2020-11-29 05:38:16.582-06', '2020-11-29 05:38:16.582-06');


--
-- Name: Branches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Branches_id_seq"', 2, true);


--
-- Name: Branches Branches_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Branches"
--     ADD CONSTRAINT "Branches_name_key" UNIQUE (name);


--
-- Name: Branches Branches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Branches"
--     ADD CONSTRAINT "Branches_pkey" PRIMARY KEY (id);


--
-- Name: Branches Branches_city_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Branches"
--     ADD CONSTRAINT "Branches_city_fkey" FOREIGN KEY (city) REFERENCES public."Cities"(id);


--
-- Name: Branches Branches_country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Branches"
--     ADD CONSTRAINT "Branches_country_fkey" FOREIGN KEY (country) REFERENCES public."Countries"(id);


--
-- Name: Branches Branches_state_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Branches"
--     ADD CONSTRAINT "Branches_state_fkey" FOREIGN KEY (state) REFERENCES public."States"(id);


--
-- Name: Branches Branches_zoneid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Branches"
--     ADD CONSTRAINT "Branches_zoneid_fkey" FOREIGN KEY (zoneid) REFERENCES public."Zones"(id);


--
-- PostgreSQL database dump complete
--

