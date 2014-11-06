<?php
//From http://code.tutsplus.com/tutorials/understanding-hash-functions-and-keeping-passwords-safe--net-17577
//http://www.sitepoint.com/password-hashing-in-php/
class PassHash {

    // blowfish
    private static $algo = '$2a';

    // cost parameter
    private static $cost = '$10';


    // mainly for internal use
    public static function unique_salt() {
        return substr(sha1(mt_rand()),0,22);
    }

    // this will be used to generate a hash
    public static function hash($password) {

        return crypt($password,
            self::$algo .
            self::$cost .
            '$' . self::unique_salt());

    }

    // this will be used to compare a password against a hash
    public static function check_password($hash, $password) {

        $full_salt = substr($hash, 0, 29);

        $new_hash = crypt($password, $full_salt);

        return ($hash == $new_hash);

    }
} 