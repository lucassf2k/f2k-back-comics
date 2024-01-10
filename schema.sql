create database if not exists f2k_comics;

create table if not exists f2k_comics.users();
create table if not exists f2k_comics.genres(
  id text primary key
  name text unique
  created_at timestamp
);
create table if not exists f2k_comics.comics();
create table if not exists f2k_comics.chapters();
create table if not exists f2k_comics.authors();
create table if not exists f2k_comics.works();
