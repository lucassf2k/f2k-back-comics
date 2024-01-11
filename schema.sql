create schema f2k_comics;

create table if not exists f2k_comics.users(
  id text primary key
  username text unique
  email text unique not null
  privilege text not null
  password text not null
  algorithm_password text not null
  salt_password text not null
  created_at timestamp
);

create table if not exists f2k_comics.genres(
  id text primary key
  name text unique
  created_at timestamp
);

create table if not exists f2k_comics.comics(
  id text primary key
  name text unique not null
  synopsis text
  author_name text not null
  release_date timestamp
  cover_url text
  url text
);

create table if not exists f2k_comics.chapters(
  id text primary key
  number text not null
  title text not null
  release_date timestamp
  url text
);

create table if not exists f2k_comics.authors(
  id text primary key
  name text not null
  about text
  date_of_birth timestamp
);

create table if not exists f2k_comics.works(
  id text primary key
  title text not null
  release_date timestamp
  url text
);
