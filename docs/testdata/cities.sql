
-- Data for Name: Cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cities" VALUES (1, 'Andorra la Vella', 1, '01', 1, 'AD', 42.50779000, 1.52109000, 1, 'Q1863', '2019-10-05 18:28:06-05', '2019-10-05 18:28:06-05');



--
-- Name: Cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cities_id_seq"', 2, false);


--
-- Name: Cities Cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Cities"
--     ADD CONSTRAINT "Cities_pkey" PRIMARY KEY (id);


--
-- Name: Cities Cities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Cities"
--     ADD CONSTRAINT "Cities_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Countries"(id);


--
-- Name: Cities Cities_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Cities"
--     ADD CONSTRAINT "Cities_state_id_fkey" FOREIGN KEY (state_id) REFERENCES public."States"(id);


--
-- PostgreSQL database dump complete
--