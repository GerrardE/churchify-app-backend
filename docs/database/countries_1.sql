ALTER SEQUENCE public."Countries_id_seq" OWNED BY public."Countries".id;

ALTER TABLE ONLY public."Countries" ALTER COLUMN id SET DEFAULT nextval('public."Countries_id_seq"'::regclass);

INSERT INTO public."Countries" VALUES (250, 'Sint Maarten (Dutch part)', 'SXM', 'SX', '1721', 'Philipsburg', 'ANG', 'Sint Maarten', 'Americas', 'Caribbean', '🇸🇽', 'U+1F1F8 U+1F1FD', 1, 'Q26273', '2023-10-24 14:38:07-05', '2023-10-24 14:38:07-05');

SELECT pg_catalog.setval('public."Countries_id_seq"', 251, false);
