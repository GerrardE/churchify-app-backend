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

