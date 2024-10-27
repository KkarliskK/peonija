<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Laukam :attribute ir jābūt pieņemtam.',
    'accepted_if' => 'Laukam :attribute ir jābūt pieņemtam, ja :other ir :value.',
    'active_url' => 'Lauks :attribute nav derīgs URL.',
    'after' => 'Laukam :attribute ir jābūt datumam pēc :date.',
    'after_or_equal' => 'Laukam :attribute ir jābūt datumam, kas ir vienāds ar vai pēc :date.',
    'alpha' => 'Lauks :attribute var saturēt tikai burtus.',
    'alpha_dash' => 'Lauks :attribute var saturēt tikai burtus, ciparus, domuzīmes un pasvītras.',
    'alpha_num' => 'Lauks :attribute var saturēt tikai burtus un ciparus.',
    'array' => 'Laukam :attribute ir jābūt masīvam.',
    'ascii' => 'Lauks :attribute var saturēt tikai vienbaita simbolus un ciparus.',
    'before' => 'Laukam :attribute ir jābūt datumam pirms :date.',
    'before_or_equal' => 'Laukam :attribute ir jābūt datumam, kas ir vienāds ar vai pirms :date.',
    'between' => [
        'array' => 'Laukam :attribute ir jābūt starp :min un :max vienumiem.',
        'file' => 'Laukam :attribute ir jābūt starp :min un :max kilobaitiem.',
        'numeric' => 'Laukam :attribute ir jābūt starp :min un :max.',
        'string' => 'Laukam :attribute ir jābūt starp :min un :max rakstzīmēm.',
    ],
    'boolean' => 'Laukam :attribute ir jābūt patiesam vai aplamam.',
    'can' => 'Lauks :attribute satur neatļautu vērtību.',
    'confirmed' => 'Lauki :attribute nesakrīt.',
    'contains' => 'Laukam :attribute trūkst nepieciešamās vērtības.',
    'current_password' => 'Parole ir nepareiza.',
    'date' => 'Lauks :attribute nav derīgs datums.',
    'date_equals' => 'Lauks :attribute ir jābūt datumam, kas vienāds ar :date.',
    'date_format' => 'Lauks :attribute neatbilst formātam :format.',
    'decimal' => 'Laukam :attribute ir jābūt :decimal decimālzīmēm.',
    'declined' => 'Laukam :attribute ir jābūt noraidītam.',
    'declined_if' => 'Laukam :attribute ir jābūt noraidītam, ja :other ir :value.',
    'different' => 'Lauks :attribute un :other ir jābūt atšķirīgiem.',
    'digits' => 'Laukam :attribute ir jābūt :digits cipariem.',
    'digits_between' => 'Laukam :attribute ir jābūt starp :min un :max cipariem.',
    'dimensions' => 'Laukam :attribute ir nederīgi attēla izmēri.',
    'distinct' => 'Lauks :attribute satur dublikātu vērtību.',
    'doesnt_end_with' => 'Lauks :attribute nedrīkst beigties ar vienu no šiem: :values.',
    'doesnt_start_with' => 'Lauks :attribute nedrīkst sākties ar vienu no šiem: :values.',
    'email' => 'Lauks :attribute ir jābūt derīgai e-pasta adresei.',
    'ends_with' => 'Lauks :attribute ir jābeidzas ar vienu no šiem: :values.',
    'enum' => 'Izvēlētais lauks :attribute ir nederīgs.',
    'exists' => 'Izvēlētais lauks :attribute ir nederīgs.',
    'extensions' => 'Laukam :attribute ir jābūt failam ar vienu no šiem paplašinājumiem: :values.',
    'file' => 'Lauks :attribute ir jābūt failam.',
    'filled' => 'Lauks :attribute ir jābūt aizpildītam.',
    'gt' => [
        'array' => 'Laukam :attribute ir jābūt vairāk nekā :value vienumiem.',
        'file' => 'Laukam :attribute ir jābūt lielākam par :value kilobaitiem.',
        'numeric' => 'Laukam :attribute ir jābūt lielākam par :value.',
        'string' => 'Laukam :attribute ir jābūt lielākam par :value rakstzīmēm.',
    ],
    'gte' => [
        'array' => 'Laukam :attribute ir jābūt vismaz :value vienumiem.',
        'file' => 'Laukam :attribute ir jābūt lielākam vai vienādam ar :value kilobaitiem.',
        'numeric' => 'Laukam :attribute ir jābūt lielākam vai vienādam ar :value.',
        'string' => 'Laukam :attribute ir jābūt lielākam vai vienādam ar :value rakstzīmēm.',
    ],
    'hex_color' => 'Laukam :attribute ir jābūt derīgai heksadecimālai krāsai.',
    'image' => 'Laukam :attribute ir jābūt attēlam.',
    'in' => 'Izvēlētais lauks :attribute ir nederīgs.',
    'in_array' => 'Lauks :attribute nav atrodams laukā :other.',
    'integer' => 'Laukam :attribute ir jābūt veselam skaitlim.',
    'ip' => 'Laukam :attribute ir jābūt derīgai IP adresei.',
    'ipv4' => 'Laukam :attribute ir jābūt derīgai IPv4 adresei.',
    'ipv6' => 'Laukam :attribute ir jābūt derīgai IPv6 adresei.',
    'json' => 'Laukam :attribute ir jābūt derīgai JSON virknei.',
    'list' => 'Lauks :attribute ir jābūt sarakstam.',
    'lowercase' => 'Laukam :attribute ir jābūt mazajiem burtiem.',
    'lt' => [
        'array' => 'Laukam :attribute ir jābūt mazāk nekā :value vienumiem.',
        'file' => 'Laukam :attribute ir jābūt mazākam par :value kilobaitiem.',
        'numeric' => 'Laukam :attribute ir jābūt mazākam par :value.',
        'string' => 'Laukam :attribute ir jābūt mazākam par :value rakstzīmēm.',
    ],
    'lte' => [
        'array' => 'Laukam :attribute nedrīkst būt vairāk par :value vienumiem.',
        'file' => 'Laukam :attribute ir jābūt mazākam vai vienādam ar :value kilobaitiem.',
        'numeric' => 'Laukam :attribute ir jābūt mazākam vai vienādam ar :value.',
        'string' => 'Laukam :attribute ir jābūt mazākam vai vienādam ar :value rakstzīmēm.',
    ],
    'mac_address' => 'Laukam :attribute ir jābūt derīgai MAC adresei.',
    'max' => [
        'array' => 'Laukā :attribute nedrīkst būt vairāk par :max vienumiem.',
        'file' => 'Lauks :attribute nedrīkst būt lielāks par :max kilobaitiem.',
        'numeric' => 'Lauks :attribute nedrīkst būt lielāks par :max.',
        'string' => 'Lauks :attribute nedrīkst būt lielāks par :max rakstzīmēm.',
    ],
    'max_digits' => 'Lauks :attribute nedrīkst saturēt vairāk par :max cipariem.',
    'mimes' => 'Laukam :attribute ir jābūt failam ar tipu: :values.',
    'mimetypes' => 'Laukam :attribute ir jābūt failam ar tipu: :values.',
    'min' => [
        'array' => 'Laukā :attribute ir jābūt vismaz :min vienumiem.',
        'file' => 'Lauks :attribute nedrīkst būt mazāks par :min kilobaitiem.',
        'numeric' => 'Lauks :attribute nedrīkst būt mazāks par :min.',
        'string' => 'Ievadlaukā :attribute nedrīkst būt mazāk par :min rakstzīmēm.',
    ],
    'min_digits' => 'Laukam :attribute ir jābūt vismaz :min cipariem.',
    'missing' => 'Laukam :attribute ir jābūt iztrūkstošam.',
    'missing_if' => 'Laukam :attribute ir jābūt iztrūkstošam, ja :other ir :value.',
    'missing_unless' => 'Laukam :attribute ir jābūt iztrūkstošam, ja :other nav :value.',
    'missing_with' => 'Laukam :attribute ir jābūt iztrūkstošam, ja ir :values.',
    'missing_with_all' => 'Laukam :attribute ir jābūt iztrūkstošam, ja ir visi :values.',
    'multiple_of' => 'Laukam :attribute ir jābūt vairākkārtīgam no :value.',
    'not_in' => 'Izvēlētais lauks :attribute ir nederīgs.',
    'not_regex' => 'Lauka :attribute formāts ir nederīgs.',
    'numeric' => 'Laukam :attribute ir jābūt skaitlim.',
    'password' => [
        'letters' => 'Laukam :attribute ir jābūt vismaz vienam burtam.',
        'mixed' => 'Laukam :attribute ir jābūt vismaz vienam lielajam un mazajam burtam.',
        'numbers' => 'Laukam :attribute ir jābūt vismaz vienam ciparam.',
        'symbols' => 'Laukam :attribute ir jābūt vismaz vienam simbolam.',
        'uncompromised' => 'Dotais lauks :attribute ir parādījies datu noplūdē. Lūdzu, izvēlieties citu :attribute.',
    ],
    'present' => 'Laukam :attribute ir jābūt klātesošam.',
    'present_if' => 'Laukam :attribute ir jābūt klātesošam, ja :other ir :value.',
    'present_unless' => 'Laukam :attribute ir jābūt klātesošam, ja :other nav :value.',
    'present_with' => 'Laukam :attribute ir jābūt klātesošam, ja ir :values.',
    'present_with_all' => 'Laukam :attribute ir jābūt klātesošam, ja ir visi :values.',
    'prohibited' => 'Lauks :attribute ir aizliegts.',
    'prohibited_if' => 'Lauks :attribute ir aizliegts, ja :other ir :value.',
    'prohibited_unless' => 'Lauks :attribute ir aizliegts, ja :other nav :values.',
    'prohibits' => 'Lauks :attribute aizliedz :other klātbūtni.',
    'regex' => 'Lauka :attribute formāts ir nederīgs.',
    'required' => 'Ievadlauks :attribute ir jāaizpilda obligāti.',
    'required_array_keys' => 'Laukam :attribute ir jāsatur ieraksti priekš: :values.',
    'required_if' => 'Lauks :attribute ir obligāts, ja :other ir :value.',
    'required_if_accepted' => 'Lauks :attribute ir obligāts, ja :other ir pieņemts.',
    'required_if_declined' => 'Lauks :attribute ir obligāts, ja :other ir noraidīts.',
    'required_unless' => 'Lauks :attribute ir obligāts, ja :other nav :values.',
    'required_with' => 'Lauks :attribute ir obligāts, ja :values ir klātesošs.',
    'required_with_all' => 'Lauks :attribute ir obligāts, ja ir klātesoši visi :values.',
    'required_without' => 'Lauks :attribute ir obligāts, ja :values nav klātesošs.',
    'required_without_all' => 'Lauks :attribute ir obligāts, ja nav klātesoši neviens no :values.',
    'same' => 'Laukam :attribute ir jāsakrīt ar :other.',
    'size' => [
        'array' => 'Laukam :attribute ir jāsatur :size vienumi.',
        'file' => 'Laukam :attribute ir jābūt :size kilobaitiem.',
        'numeric' => 'Laukam :attribute ir jābūt :size.',
        'string' => 'Laukam :attribute ir jābūt :size rakstzīmēm.',
    ],
    'starts_with' => 'Lauks :attribute jāsākas ar vienu no šiem: :values.',
    'string' => 'Laukam :attribute ir jābūt virknei.',
    'timezone' => 'Laukam :attribute ir jābūt derīgai laika zonai.',
    'unique' => ':attribute ir jau aizņemta.',
    'uploaded' => ':attribute neizdevās augšupielādēt.',
    'uppercase' => 'Laukam :attribute ir jābūt lielajiem burtiem.',
    'url' => 'Laukam :attribute ir jābūt derīgam URL.',
    'ulid' => 'Laukam :attribute ir jābūt derīgam ULID.',
    'uuid' => 'Laukam :attribute ir jābūt derīgam UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'name' => [
            'min' => 'Vārds nedrīkst būt īsāks par :min rakstzīmēm.', 
        ],
        'email' => [
            'regex' => 'E-pasta adrese ir jābūt derīgai ar pareizu domēnu (piemēram, piemērs.com).', 
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'email' => 'e-pasta adrese',
        'password' => 'parole',
        'name' => 'vārds',
        'username' => 'lietotājvārds',
        'phone' => 'telefona numurs',
        'address' => 'adrese',
        // Add any other attributes you need here.
    ],


];
