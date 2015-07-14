<?php

function getExtJSOrderBy($sort) {
    $orderQuery = "";
    if ($sort){
        $orderQuery .= " ORDER BY";
        $sort = json_decode($sort);
        foreach ($sort as $s) {
            $orderQuery .= " $s->property $s->direction,";
        }
        $orderQuery = substr($orderQuery, 0, -1);
    }
    return $orderQuery;
}

function getExtJSFilters($filters){

    // GridFilters sends filters as an Array if not json encoded
    if (is_array($filters)) {
        $encoded = false;
    } else {
        $encoded = true;
        $filters = json_decode($filters);
    }

    $where = ' 0 = 0 ';
    $qs = '';

    // loop through filters sent by client
    if (is_array($filters)) {
        for ($i=0;$i<count($filters);$i++){
            $filter = $filters[$i];

            // assign filter data (location depends if encoded or not)
            if ($encoded) {
                $field = $filter->field;
                $value = $filter->value;
                $compare = isset($filter->comparison) ? $filter->comparison : null;
                $filterType = $filter->type;
            } else {
                $field = $filter['field'];
                $value = $filter['data']['value'];
                $compare = isset($filter['data']['comparison']) ? $filter['data']['comparison'] : null;
                $filterType = $filter['data']['type'];
            }

            switch($filterType){
                case 'string' : $qs .= " AND ".$field." LIKE '%".$value."%'"; Break;
                case 'list' :
                    if (strstr($value,',')){
                        $fi = explode(',',$value);
                        for ($q=0;$q<count($fi);$q++){
                            $fi[$q] = "'".$fi[$q]."'";
                        }
                        $value = implode(',',$fi);
                        $qs .= " AND ".$field." IN (".$value.")";
                    }else{
                        $qs .= " AND ".$field." = '".$value."'";
                    }
                    Break;
                case 'boolean' : $qs .= " AND ".$field." = ".($value); Break;
                case 'numeric' :
                    switch ($compare) {
                        case 'eq' : $qs .= " AND ".$field." = ".$value; Break;
                        case 'lt' : $qs .= " AND ".$field." < ".$value; Break;
                        case 'gt' : $qs .= " AND ".$field." > ".$value; Break;
                    }
                    Break;
                case 'date' :
                    switch ($compare) {
                        case 'eq' : $qs .= " AND ".$field." = '".date('Y-m-d',strtotime($value))."'"; Break;
                        case 'lt' : $qs .= " AND ".$field." < '".date('Y-m-d',strtotime($value))."'"; Break;
                        case 'gt' : $qs .= " AND ".$field." > '".date('Y-m-d',strtotime($value))."'"; Break;
                    }
                    Break;
            }
        }
        $where .= $qs;
    }

    return $where;
}