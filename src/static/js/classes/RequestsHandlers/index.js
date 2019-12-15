import React from 'react';
import Cookie from 'js-cookie';
import RouteLink from '../../components/RouteLink';
import getRequest from '../../functions/getRequest';

const address_fields = {
    county: "Νομός",
    municipality: "Δήμος",
    city: "Πόλη",
    district: "Περιοχή",
    address_name: "Διεύθυνση",
    address_number: "Αριθμός",
    post_code: "Τ.Κ.",
    post_office_box: "Τ.Θ.",
};

const address_views = {
    county: function(data){
        return data.county || "-";
    },
    municipality: function(data){
        return data.municipality || "-";
    },
    city: function(data){
        return data.city || "-";
    },
    district: function(data){
        return data.district || "-";
    },
    address_name: function(data){
        return data.address_name || "-";
    },
    address_number: function(data){
        return data.address_number || "-";
    },
    post_code: function(data){
        return data.post_code || "-";
    },
    post_office_box: function(data){
        return data.post_office_box || "-";
    },
};

function details_link_view(link, data){
    let title = "Προβολή";
    return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
}

function afm_view(data){
    return data.afm || "-";
}

function agreed_power_view(data){
    return data.agreed_power || "-";
}

function distinctive_titles_view(data){
    return data.distinctive_titles && "" !== data.distinctive_titles.trim() ? data.distinctive_titles : "-";
}

function installed_power_view(data){
    return data.installed_power || "-";
}

function power_station_type_view(data){
            
    let ret = "-";

    if( !! data.type ){
        
        if( !! data.component_type_1 || !! data.component_type_2 ){

            if( !! data.component_type_1 ){
                ret = <li>{ data.component_type_1.name }</li>;
            }

            if( !! data.component_type_2 ){
                ret = <li>{ data.component_type_2.name }</li>;
            }

            ret = <li>{ data.type.name }<ul>{ ret }</ul></li>;
        }
        else{
            ret = <li>{ data.type.name }</li>;
        }

        if( !! data.type.parent ){
            ret = <li>{ data.type.parent.name }<ul>{ ret }</ul></li>;
        }

        ret = <ul>{ ret }</ul>;
    }

    return  ret;
}

function legal_person_type_view(data){
            
    let ret = "-";

    if( !! data.legal_person_type ){
        ret = data.legal_person_type.name;
    }

    return  ret;
}

function sample_legal_person_type_view(data){
            
    let ret = "Φυσικό";

    if( !! data.legal_person_type ){
        
        ret = <li>{ data.legal_person_type.name }</li>;

        if( !! data.legal_person_type.parent ){
            ret = <li>{ data.legal_person_type.parent.name }<ul>{ ret }</ul></li>;
        }

        ret = <ul>{ ret }</ul>;
    }

    return  ret;
}

function last_counting_view(data){
    return data.last_counting || "-";
}

function next_counting_view(data){
    return data.next_counting || "-";
}

function next_clearance_view(data){
    return data.next_clearance || "-";
}

function person_view(data){
    let link = "/persons/" + data.person.id;
    let title = ( data.person.firstname || "" ) + ( data.person.firstname && data.person.lastname ? " "  : "" ) + ( data.person.lastname || "" );
    return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
}

function sample_powerStationsCount_view(data){
    let ret = null;
    let title = data.powerStationsCount;
    let link = "/sample/energy-suppliers/" + data.id + "/power-stations";
    ret = <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
    return ret;
}

function sample_powerConsumersCount_view(data){
    let ret = null;
    let title = data.powerConsumersCount;
    let link = "/sample/energy-suppliers/" + data.id + "/power-consumers";
    ret = <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
    return ret;
}

function sample_person_view(data){
    let link = "/sample/persons/" + data.person.id;
    let title = ( data.person.firstname || "" ) + ( data.person.firstname && data.person.lastname ? " "  : "" ) + ( data.person.lastname || "" );
    return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
}

function supplier_view(data){
    let link = "/suppliers/" + data.supplier.id;
    let title = data.supplier.name;
    return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
}

function sample_supplier_view(data){
    let link = "/sample/energy-suppliers/" + data.supplier.id;
    let title = data.supplier.name;
    return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
}

function voltage_level_view(data){
    return !! data.voltage_level ? data.voltage_level.title : "-";
}

function website_view(data){
    let link = data.website;
    let title = link.replace("https://", "").replace("http://", "").replace("www.", "").replace(/^\/|\/$/g, '');
    return <a href={ link } title={ title } target="_blank">{ title }</a>;
}

function suppliersAdministrator_view(data){

    const adminOf = data.isAdminOf;

    let ret = "-";

    if( !! adminOf ){

        let i, list;
        let link, title;
        let suppliers = void 0 !== adminOf.suppliers && adminOf.suppliers.length ? adminOf.suppliers : null;

        if( null !== suppliers ){
            list = [];
            i = 0;
            while( i < suppliers.length ){
                link = "/suppliers/" + suppliers[i].id;
                title = suppliers[i].name;
                list.push( <RouteLink key={ i } to={ link } title={ title }>{ title }</RouteLink> );
                i += 1;
            }
            ret = <span>{ list }</span>;
        }
    }

    return ret;
}

function communitiesAdministrator_view(data){
            
    const adminOf = data.isAdminOf;

    let ret = "-";

    if( !! adminOf ){

        let i, list;
        let link, title;
        let communities = void 0 !== adminOf.communities && adminOf.communities.length ? adminOf.communities : null;
        
        if( null !== communities ){
            list = [];
            i = 0;
            while( i < communities.length ){
                link = "/communities/" + communities[i].id;
                title = communities[i].name;
                list.push( <RouteLink key={ i } to={ link } title={ title }>{ title }</RouteLink> );
                i += 1;
            }
            ret = <span>{ list }</span>;
        }
    }

    return ret;
}

const TableHeaders = Object.freeze({
    users: Object.freeze({
        id: "Id",
        username: "Όνομα χρήστη",
        email: "E-mail",
        fullname: "Όνομα",
        firstname: "Όνομα",
        lastname: "Επώνυμο",
        enabled: "Ενεργός λογαριασμός",
        accountNonExpired: "Ο λογαριασμός δεν έχει λήξει",
        credentialsNonExpired: "Τα διαπιστευτήρια δεν έχουν λήξει",
        accountNonLocked: "Μη-κλειδωμένος λογαριασμός",
        registered: "Ημερομηνία εγγραφής",
        updated: "Ημερομηνία ανανέωσης",
        roles: "Ρόλος χρήσης",
        accountExpired: "Ο λογαριασμός έχει λήξει",
        credentialsExpired: "Τα διαπιστευτήρια έχουν λήξει",
        accountLocked: "Κλειδωμένος λογαριασμός",
        suppliersAdministrator: "Διαχειριστής προμηθευτών ενέργειας",
        communitiesAdministrator: "Διαχειριστής ενεργειακών κοινοτήτων",
        details_link: "Λεπτομέρειες",
    }),
    suppliers: Object.freeze({
        uuid: "Id",
        name:"Τίτλος",
        website: "Ιστοσελίδα",
        administrator: "Διαχειριστής",
        nettings: "Ενεργειακοί Συμψηφισμοί",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    communities: Object.freeze({
        id: "Id",
        name:"Τίτλος",
        afm: "Α.Φ.Μ",
        distinctive_titles: "Διακριτικοί Τίτλοι",
        legal_form: "Νομική Μορφή",
        creation_date: "Ημ/νία Σύστασης",
        state: "Κατάσταση",
        gemi_number : "Αριθμός Γ.Ε.Μ.Η",
        gemi_service: "Αρμόδια Υπηρεσία Γ.Ε.Μ.Η",
        county: "Νομός",
        municipality: "Δήμος",
        city: "Πόλη",
        district: "Περιοχή",
        address_name: "Διεύθυνση",
        address_number: "Αριθμός",
        post_code: "Τ.Κ.",
        post_office_box: "Τ.Θ.",
        administrator: "Διαχειριστής",
        nettings: "Ενεργειακοί Συμψηφισμοί",
        registered: "Ημερομηνία καταχώρισης",
        _links: "Σύνδεσμοι",
        administrator: "Διαχειριστής",
        details_link: "Λεπτομέρειες",
    }),
    persons: Object.freeze({
        id: "Id",
        firstname: "Όνομα",
        lastname: "Επώνυμο",
        natural_person: "Νομικό πρόσωπο",
        afm: "Α.Φ.Μ",
        powerConsumers: "Παροχές κατανάλωσης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        type: "Τύπος",
        netting: "Ενεργειακός συμψηφισμός",
        voltage_level: "Επίπεδο τάσης",
        installed_power: "Εγκατεστημένη ισχύς (kW)",
        supplier: "Προμηθευτής ενέργειας",
        last_counting: "Τελευταία καταμέτρηση",
        next_counting: "Επόμενη καταμέτρηση",
        next_clearance: "Επόμενη εκκαθάριση",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    power_consumers: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        person: "Κάτοχος",
        voltage_level: "Επίπεδο τάσης",
        agreed_power: "Συμφωνημένη ισχύς (kVA)",
        supplier: "Προμηθευτής ενέργειας",
        netting: "Ενεργειακός συμψηφισμός",
        participationRate: "Ποσοστό συμμετοχής (%)",
        vulnerableConsumer: "Ευάλωτος καταναλωτής",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    nettings: Object.freeze({
        id: "Id",
        community: "Ενεργειακή κοινότητα",
        supplier: "Προμηθευτής ενέργειας",
        powerStation: "Σταθμός παραγωγής",
        powerConsumers: "Παροχές κατανάλωσης",
        state: "Κατάσταση",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    sample_persons: Object.freeze({
        afm: "Α.Φ.Μ",
        firstname: "Όνομα",
        lastname: "Επώνυμο",
        natural_person: "Νομικό πρόσωπο",
        powerConsumers: "Παροχές κατανάλωσης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    sample_suppliers: Object.freeze({
        id: "Id",
        name: "Τίτλος",
        website: "Ιστοσελίδα",
        powerStationsCount: "Αριθμός σταθμών παραγωγής",
        powerConsumersCount: "Αριθμός παροχών κατανάλωσης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    sample_suppliers_power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        type: "Τύπος",
        component_type_1: "",
        component_type_2: "",
        voltage_level: "Επίπεδο τάσης",
        installed_power: "Εγκατεστημένη ισχύς (kW)",
        supplier: "Προμηθευτής ενέργειας",
        last_counting: "Τελευταία καταμέτρηση",
        next_counting: "Επόμενη καταμέτρηση",
        next_clearance: "Επόμενη εκκαθάριση",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    sample_suppliers_power_consumers: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        person: "Κάτοχος",
        voltage_level: "Επίπεδο τάσης",
        agreed_power: "Συμφωνημένη ισχύς (kVA)",
        supplier: "Προμηθευτής ενέργειας",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    sample_communities: Object.freeze({
        id: "Id",
        name:"Τίτλος",
        afm: "Α.Φ.Μ",
        distinctive_titles: "Διακριτικοί Τίτλοι",
        legal_form: "Νομική Μορφή",
        creation_date: "Ημ/νία Σύστασης",
        state: "Κατάσταση",
        gemi_number : "Αριθμός Γ.Ε.Μ.Η",
        ...address_fields,
        details_link: "Λεπτομέρειες",
    }),
    sample_power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        type: "Τύπος",
        component_type_1: "",
        component_type_2: "",
        voltage_level: "Επίπεδο τάσης",
        installed_power: "Εγκατεστημένη ισχύς (kW)",
        supplier: "Προμηθευτής ενέργειας",
        last_counting: "Τελευταία καταμέτρηση",
        next_counting: "Επόμενη καταμέτρηση",
        next_clearance: "Επόμενη εκκαθάριση",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    sample_power_consumers: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        person: "Κάτοχος",
        voltage_level: "Επίπεδο τάσης",
        agreed_power: "Συμφωνημένη ισχύς (kVA)",
        supplier: "Προμηθευτής ενέργειας",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
    metrics_power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        kWh: "κWh",
        date: "Ημερομηνία μέτρησης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
        details_link: "Λεπτομέρειες",
    }),
});

const TableColumns = Object.freeze({
    users: [ 
        "fullname", /*"firstname", "lastname",*/ "email",
        "username", "roles",
        /*"enabled",*/ /*"accountLocked",*/ /*"accountExpired",*/ /*"credentialsExpired",*/
        /*"registered",*/ /*"updated",*/
        "suppliersAdministrator", "communitiesAdministrator",
        "details_link"
    ],
    suppliers: [ "name", "nettings", "administrator", "website", "details_link" ],
    communities: [
        "name",
        "afm",
        "gemi_number", /*"gemi_service",*/ 
        "distinctive_titles", "legal_form", "creation_date", "state", 
        /*"county",*/ "municipality", /*"city",*/ /*"district",*/ /*"address_name",*/ /*"address_number",*/ /*"post_code",*/ /*"post_office_box",*/
        "nettings", "administrator",
        "details_link"
    ],
    persons: [ "firstname", "lastname", "natural_person", "afm", "powerConsumers", "details_link" ],
    power_stations: [ "supplyNumber", "netting", "type", "voltage_level", "installed_power", "supplier", "last_counting", "next_counting", "next_clearance", "details_link" ],
    power_consumers: [
        "supplyNumber",
        "netting", "participationRate", "vulnerableConsumer",
        "voltage_level", "agreed_power", "person", "supplier",
        "details_link"
        ],
    nettings: [ "community", "supplier", "powerStation", "powerConsumers", "state", "registered", "updated", "details_link" ],
    sample_persons: [ "firstname", "lastname", "natural_person", "afm", "powerConsumers", "details_link"],
    sample_suppliers:  ["name", "powerStationsCount", "powerConsumersCount", "website", "details_link"],
    sample_suppliers_power_stations: [ "supplyNumber", "type", "voltage_level", "installed_power", "supplier", "last_counting", "next_counting", "next_clearance", "details_link" ],
    sample_suppliers_power_consumers: [ "supplyNumber", "voltage_level", "agreed_power", "person", "supplier", "details_link" ],
    sample_communities: [
        "name", "afm",
        "gemi_number", /*"gemi_service",*/ 
        "distinctive_titles", "legal_form", "creation_date", "state", 
        /*"county",*/ "municipality", /*"city",*/ "district", /*"address_name",*/ /*"address_number",*/ /*"post_code",*/ /*"post_office_box",*/
        "details_link"
    ],
    sample_power_stations: [ "supplyNumber", "type", "voltage_level", "installed_power", "supplier", "last_counting", "next_counting", "next_clearance", "details_link" ],
    sample_power_consumers: [ "supplyNumber", "voltage_level", "agreed_power", "person", "supplier", "details_link" ],
    metrics_power_stations: [ "supplyNumber", "kWh", "date", "details_link" ],
});

const TableValues = Object.freeze({
    users: Object.freeze({
        fullname: function(data){
            return ( data.firstname || "" ) + ( data.lastname ? ( data.firstname ? " " : "" ) + data.lastname : "" );
        },
        roles: function(data){
            let ret = "";
            let r;
            for( r in data.roles ){
                if( data.roles.hasOwnProperty( r ) ){
                    ret += data.roles[r].title;
                }
            }
            return ret;
        },
        suppliersAdministrator: suppliersAdministrator_view,
        communitiesAdministrator: communitiesAdministrator_view,
        details_link: function(data){
            return details_link_view( "/users/" + data.id, data );
        }
    }),
    suppliers: Object.freeze({
        website: function(data){
            let link = data.website;
            let title = link.replace("https://", "").replace("http://", "").replace("www.", "").replace(/^\/|\/$/g, '');
            return <a href={ link } title={ title } target="_blank">{ title }</a>;
        },
        administrator: function(data){
            let link = "/users/" + data.administrator.id;
            let title = ( data.administrator.firstname || "" ) + ( data.administrator.firstname && data.administrator.lastname ? " "  : "" ) + ( data.administrator.lastname || "" );
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        nettings: function(data){
            return data.nettings.length;
        },
        details_link: function(data){
            return details_link_view( "/suppliers/" + data.id, data );
        }
    }),
    communities: Object.freeze({
        afm: afm_view,
        distinctive_titles: distinctive_titles_view,
        ...address_views,
        nettings: function(data){
            return data.nettings.length;
        },
        administrator: function(data){
            let link = "/users/" + data.administrator.id;
            let title = ( data.administrator.firstname || "" ) + ( data.administrator.firstname && data.administrator.lastname ? " "  : "" ) + ( data.administrator.lastname || "" );
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        details_link: function(data){
            let link = "/communities/" + data.id;
            let title = "Προβολή";
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
    }),
    persons: Object.freeze({
        afm: afm_view,
        natural_person: legal_person_type_view,
        powerConsumers: function(data){
            return data.powerConsumers.length;
        },
        details_link: function(data){
            return details_link_view( "/persons/" + data.id, data );
        }
    }),
    power_stations: Object.freeze({
        netting: function(data){
            let link = "/nettings/" + data.netting.id;
            let title = data.netting.id;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        installed_power: installed_power_view,
        supplier: supplier_view,
        type: power_station_type_view,
        voltage_level: voltage_level_view,
        last_counting: last_counting_view,
        last_counting: last_counting_view,
        next_counting: next_counting_view,
        next_clearance: next_clearance_view,
        details_link: function(data){
            let link = "/power-stations/" + data.id;
            let title = "Προβολή";
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
    }),
    power_consumers: Object.freeze({
        netting: function(data){
            let link = "/nettings/" + data.netting.id;
            let title = data.netting.id;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        person: person_view,
        voltage_level: voltage_level_view,
        agreed_power: agreed_power_view,
        supplier: supplier_view,
        details_link: function(data){
            return details_link_view( "/power-consumers/" + data.id, data );
        }
    }),
    nettings: Object.freeze({
        details_link: function(data){
            let link = "/nettings/" + data.id;
            let title = "Προβολή";
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        community: function(data){
            let link = "/communities/" + data.community.id;
            let title = data.community.name;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        supplier: function(data){
            let link = "/suppliers/" + data.supplier.id;
            let title = data.supplier.name;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        powerConsumers: function(data){
            return data.powerConsumers.length;
        },
        powerStation: function(data){
            let link = "/power-stations/" + data.powerStation.id;
            let title = data.powerStation.supplyNumber;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        state: function(data){
            return "@todo";
        },
    }),
    sample_persons: Object.freeze({
        firstname: function(data){
            return data.firstname || "-";
        },
        lastname: function(data){
            return data.lastname || "-";
        },
        powerConsumers: function(data){
            return !! data.powerConsumers ? data.powerConsumers.length : "-";
        },
        natural_person: sample_legal_person_type_view,
        details_link: function(data){
            return details_link_view( "/sample/persons/" + data.id, data );
        }
    }),
    sample_suppliers: Object.freeze({
        website: website_view,
        powerStationsCount: sample_powerStationsCount_view,
        powerConsumersCount: sample_powerConsumersCount_view,
        details_link: function(data){
            return details_link_view( "/sample/energy-suppliers/" + data.id, data );
        }
    }),
    sample_suppliers_power_stations: Object.freeze({
        installed_power: installed_power_view,
        supplier: sample_supplier_view,
        type: power_station_type_view,
        voltage_level: voltage_level_view,
        last_counting: last_counting_view,
        next_counting: next_counting_view,
        next_clearance: next_clearance_view,
        details_link: function(data){
            return details_link_view( "/sample/power-stations/" + data.id, data );
        }
    }),
    sample_suppliers_power_consumers: Object.freeze({
        agreed_power: agreed_power_view,
        person: sample_person_view,
        supplier: sample_supplier_view,
        voltage_level: voltage_level_view,
        details_link: function(data){
            return details_link_view( "/sample/power-consumers/" + data.id, data );
        },
    }),
    sample_communities: Object.freeze({
        afm: afm_view,
        distinctive_titles: distinctive_titles_view,
        ...address_views,
        details_link: function(data){
            return details_link_view( "/sample/communities/" + data.id, data );
        }
    }),
    sample_power_stations: Object.freeze({
        installed_power: installed_power_view,
        supplier: sample_supplier_view,
        type: power_station_type_view,
        voltage_level: voltage_level_view,
        last_counting: last_counting_view,
        next_counting: next_counting_view,
        next_clearance: next_clearance_view,
        details_link: function(data){
            return details_link_view( "/sample/power-stations/" + data.id, data );
        }
    }),
    sample_power_consumers: Object.freeze({
        agreed_power: agreed_power_view,
        person: sample_person_view,
        supplier: sample_supplier_view,
        voltage_level: voltage_level_view,
        details_link: function(data){
            return details_link_view( "/sample/power-consumers/" + data.id, data );
        },
    }),
    metrics_power_stations: Object.freeze({
        details_link: function(data){
            return details_link_view( "/metrics/power-stations/" + data.id, data );
        },
    }),
});

const TableHeadersSingle = Object.freeze({
    users: Object.freeze({
        id: "Id",
        username: "Όνομα χρήστη",
        email: "E-mail",
        firstname: "Όνομα",
        lastname: "Επώνυμο",
        enabled: "Ενεργός λογαριασμός",
        accountNonExpired: "Ο λογαριασμός δεν έχει λήξει",
        credentialsNonExpired: "Τα διαπιστευτήρια δεν έχουν λήξει",
        accountNonLocked: "Μη-κλειδωμένος λογαριασμός",
        registered: "Ημερομηνία εγγραφής",
        updated: "Ημερομηνία ανανέωσης",
        roles: "Ρόλος χρήσης",
        accountExpired: "Ο λογαριασμός έχει λήξει",
        credentialsExpired: "Τα διαπιστευτήρια έχουν λήξει",
        accountLocked: "Κλειδωμένος λογαριασμός",
        suppliersAdministrator: "Διαχειριστής προμηθευτών ενέργειας",
        communitiesAdministrator: "Διαχειριστής ενεργειακών κοινοτήτων",
    }),
    suppliers: Object.freeze({
        uuid: "Id",
        name:"Τίτλος",
        website: "Ιστοσελίδα",
        administrator: "Διαχειριστής",
        nettings: "Ενεργειακοί Συμψηφισμοί",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    communities: Object.freeze({
        id: "Id",
        name:"Τίτλος",
        afm: "Α.Φ.Μ",
        distinctive_titles: "Διακριτικοί Τίτλοι",
        legal_form: "Νομική Μορφή",
        creation_date: "Ημ/νία Σύστασης",
        state: "Κατάσταση",
        gemi_number : "Αριθμός Γ.Ε.Μ.Η",
        gemi_service: "Αρμόδια Υπηρεσία Γ.Ε.Μ.Η",
        nettings: "Ενεργειακοί Συμψηφισμοί",
        ...address_fields,
        administrator: "Διαχειριστής",
        admin_name: "Όνομα διαχειριστή",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    persons: Object.freeze({
        id: "Id",
        firstname: "Όνομα",
        lastname: "Επώνυμο",
        natural_person: "Νομικό πρόσωπο",
        afm: "Α.Φ.Μ",
        powerConsumers: "Παροχές κατανάλωσης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        netting: "Ενεργειακός συμψηφισμός",
        type: "Τύπος",
        component_type_1: "",
        component_type_2: "",
        installed_power: "Εγκατεστημένη ισχύς (kW)",
        voltage_level: "Επίπεδο τάσης",
        supplier: "Προμηθευτής ενέργειας",
        last_counting: "Τελευταία καταμέτρηση",
        next_counting: "Επόμενη καταμέτρηση",
        next_clearance: "Επόμενη εκκαθάριση",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    power_consumers: Object.freeze({
        supplyNumber: "Αριθμός παροχής",
        person: "Κάτοχος",
        voltage_level: "Επίπεδο τάσης",
        agreed_power: "Συμφωνημένη ισχύς (kVA)",
        supplier: "Προμηθευτής ενέργειας",
        netting: "Ενεργειακός συμψηφισμός",
        participationRate: "Ποσοστό συμμετοχής (%)",
        vulnerableConsumer: "Ευάλωτος καταναλωτής",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    nettings: Object.freeze({
        id: "Id",
        community: "Ενεργειακή κοινότητα",
        supplier: "Προμηθευτής ενέργειας",
        powerStation: "Σταθμός παραγωγής",
        powerConsumers: "Παροχές κατανάλωσης",
        state: "Κατάσταση",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    sample_persons: Object.freeze({
        id: "Id",
        afm: "Α.Φ.Μ",
        firstname: "Όνομα",
        lastname: "Επώνυμο",
        natural_person: "Νομικό πρόσωπο",
        powerConsumers: "Παροχές κατανάλωσης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    sample_suppliers: Object.freeze({
        id: "Id",
        name: "Τίτλος",
        website: "Ιστοσελίδα",
        powerStationsCount: "Αριθμός σταθμών παραγωγής",
        powerConsumersCount: "Αριθμός παροχών κατανάλωσης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    sample_communities: Object.freeze({
        id: "Id",
        afm: "Α.Φ.Μ",
        name: "Τίτλος",
        state: "Κατάσταση",
        gemi_number: "Αριθμός Γ.Ε.Μ.Η",
        distinctive_titles: "Διακριτικοί Τίτλοι",
        creation_date: "Ημ/νία Σύστασης",
        legal_form: "Νομική Μορφή",
        gemi_service: "Αρμόδια Υπηρεσία ΓΕΜΗ",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    sample_power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        type: "Τύπος",
        component_type_1: "",
        component_type_2: "",
        installed_power: "Εγκατεστημένη ισχύς (kW)",
        voltage_level: "Επίπεδο τάσης",
        supplier: "Προμηθευτής ενέργειας",
        last_counting: "Τελευταία καταμέτρηση",
        next_counting: "Επόμενη καταμέτρηση",
        next_clearance: "Επόμενη εκκαθάριση",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    sample_power_consumers: Object.freeze({
        supplyNumber: "Αριθμός παροχής",
        person: "Κάτοχος",
        voltage_level: "Επίπεδο τάσης",
        agreed_power: "Συμφωνημένη ισχύς (kVA)",
        supplier: "Προμηθευτής ενέργειας",
        ...address_fields,
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης",
    }),
    metrics_power_stations: Object.freeze({
        id: "Id",
        supplyNumber: "Αριθμός παροχής",
        kWh: "κWh",
        date: "Ημερομηνία μέτρησης",
        registered: "Ημερομηνία καταχώρισης",
        updated: "Ημερομηνία ανανέωσης"
    }),
});

const TableColumnsSingle = Object.freeze({
    users: [ 
        "firstname", "lastname", "email",
        "username", "roles",
        "suppliersAdministrator", "communitiesAdministrator",
        "enabled", "accountLocked", "accountExpired", "credentialsExpired",
        "registered", "updated",
    ],
    suppliers: [ "name", "administrator", "nettings", "website", "registered", "updated" ],
    communities: [
        "name", 
        "afm",
        "gemi_number", "gemi_service",
        "distinctive_titles", "legal_form", "creation_date", "state", 
        "county", "municipality", "city", "district", "address_name", "address_number", "post_code", "post_office_box",

        "nettings", "administrator",
        "registered", "updated"
    ],
    persons: [ "firstname", "lastname", "natural_person", "afm", "powerConsumers", "registered", "updated" ],
    power_stations: [
        "supplyNumber",
        "netting",
        "type", "installed_power", "voltage_level", "supplier", "last_counting", "next_counting", "next_clearance",
        "county", "municipality", "city", "district", "address_name", "address_number", "post_code", "post_office_box",
        "registered", "updated"
    ],
    power_consumers: [
        "supplyNumber",
        "netting", "participationRate", "vulnerableConsumer",
        "voltage_level", "agreed_power", "person", "supplier",
        "county", "municipality", "city", "district", "address_name", "address_number", "post_code", "post_office_box",
        "registered", "updated",
    ],
    nettings: [ "community", "supplier", "powerStation", "powerConsumers", "state", "registered", "updated" ],
    sample_persons: [ "firstname", "lastname", "natural_person", "afm", "powerConsumers", "registered", "updated"],
    sample_suppliers:  ["name", "powerStationsCount", "powerConsumersCount", "website", "registered", "updated"],
    sample_communities: [
        "name", "afm",
        "gemi_number", "gemi_service",
        "distinctive_titles", "legal_form", "creation_date", "state", 
        "county", "municipality", "city", "district", "address_name", "address_number", "post_code", "post_office_box",
        "registered", "updated"
    ],
    sample_power_stations: [ 
        "supplyNumber", "type", "installed_power", "voltage_level", "supplier", "last_counting", "next_counting", "next_clearance",
        "county", "municipality", "city", "district", "address_name", "address_number", "post_code", "post_office_box",
        "registered", "updated"
    ],
    sample_power_consumers: [ 
        "supplyNumber", "voltage_level", "agreed_power", "person", "supplier",
        "county", "municipality", "city", "district", "address_name", "address_number", "post_code", "post_office_box",
        "registered", "updated"
    ],
    metrics_power_stations: [ "supplyNumber", "kWh", "date", "registered", "updated" ],
});

const TableValuesSingle = Object.freeze({
    users: Object.freeze({
        roles: function(data){
            let ret = "";
            let r;
            for( r in data.roles ){
                if( data.roles.hasOwnProperty( r ) ){
                    ret += data.roles[r].title;
                }
            }
            return ret;
        },
        suppliersAdministrator: suppliersAdministrator_view,
        communitiesAdministrator: communitiesAdministrator_view,
    }),
    suppliers: Object.freeze({
        website: website_view,
        administrator: function(data){
            let link = "/users/" + data.administrator.id;
            let title = ( data.administrator.firstname || "" ) + ( data.administrator.firstname && data.administrator.lastname ? " "  : "" ) + ( data.administrator.lastname || "" );
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        nettings: function(data){
            
            let ret = "-";

            if( !! data.nettings ){

                let link, title;
                let i = 0;
                
                ret = [];

                i = 0;
                while( i < data.nettings.length ){
                    link = "/nettings/" + data.nettings[i].id;
                    title = data.nettings[i].id;
                    ret.push( <li key={ i }><RouteLink to={ link } title={ title }>{ title }</RouteLink></li> );
                    i++;
                }

                ret = <ol className="supplier-nettings">{ ret }</ol>
            }

            return ret;
        },
    }),
    communities: Object.freeze({
        afm: afm_view,
        distinctive_titles: distinctive_titles_view,
        ...address_views,
        nettings: function(data){
            
            let ret = "-";

            if( !! data.nettings ){

                let link, title;
                let i = 0;
                
                ret = [];

                i = 0;
                while( i < data.nettings.length ){
                    link = "/nettings/" + data.nettings[i].id;
                    title = data.nettings[i].id;
                    ret.push( <li key={ i }><RouteLink to={ link } title={ title }>{ title }</RouteLink></li> );
                    i++;
                }

                ret = <ol className="community-nettings">{ ret }</ol>
            }

            return ret;
        },
        administrator: function(data){
            let link = "/users/" + data.administrator.id;
            let title = ( data.administrator.firstname || "" ) + ( data.administrator.firstname && data.administrator.lastname ? " "  : "" ) + ( data.administrator.lastname || "" );
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
    }),   
    persons: Object.freeze({
        afm: afm_view,
        natural_person: legal_person_type_view,
        powerConsumers: function(data){
            
            let ret = "-";

            if( !! data.powerConsumers ){

                let link, title;
                let i = 0;
                
                ret = [];

                i = 0;
                while( i < data.powerConsumers.length ){
                    link = "/power-consumers/" + data.powerConsumers[i].id;
                    title = data.powerConsumers[i].supplyNumber;
                    ret.push( <li key={ i }><RouteLink to={ link } title={ title }>{ title }</RouteLink></li> );
                    i++;
                }

                ret = <ol className="person-power-consumers">{ ret }</ol>
            }

            return ret;
        },
    }), 
    power_stations: Object.freeze({
        netting: function(data){
            let link = "/nettings/" + data.netting.id;
            let title = data.netting.id;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        installed_power: installed_power_view,
        supplier: supplier_view,
        type: power_station_type_view,
        voltage_level: voltage_level_view,
        last_counting: last_counting_view,
        last_counting: last_counting_view,
        next_counting: next_counting_view,
        next_clearance: next_clearance_view,
        ...address_views,
    }),
    power_consumers: Object.freeze({
        netting: function(data){
            let link = "/nettings/" + data.netting.id;
            let title = data.netting.id;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        person: person_view,
        voltage_level: voltage_level_view,
        agreed_power: agreed_power_view,
        supplier: supplier_view,
        ...address_views,
    }),
    nettings: Object.freeze({
        community: function(data){
            let link = "/communities/" + data.community.id;
            let title = data.community.name;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        supplier: function(data){
            let link = "/suppliers/" + data.supplier.id;
            let title = data.supplier.name;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        powerConsumers: function(data){
            
            let ret = "-";

            if( !! data.powerConsumers ){

                let link, title;
                let i = 0;
                
                ret = [];

                i = 0;
                while( i < data.powerConsumers.length ){
                    link = "/power-consumers/" + data.powerConsumers[i].id;
                    title = data.powerConsumers[i].supplyNumber;
                    ret.push( <li key={ i }><RouteLink to={ link } title={ title }>{ title }</RouteLink></li> );
                    i++;
                }

                ret = <ol className="netting-power-consumers">{ ret }</ol>
            }

            return ret;
        },
        powerStation: function(data){
            let link = "/power-stations/" + data.powerStation.id;
            let title = data.powerStation.supplyNumber;
            return <RouteLink to={ link } title={ title }>{ title }</RouteLink>;
        },
        state: function(data){
            return "@todo";
        },
    }),
    sample_persons: Object.freeze({
        firstname: function(data){
            return data.firstname || "-";
        },
        lastname: function(data){
            return data.lastname || "-";
        },
        natural_person: sample_legal_person_type_view,
        powerConsumers: function(data){
            
            let ret = "-";

            if( !! data.powerConsumers ){

                let link, title;
                let i = 0;
                
                ret = [];

                i = 0;
                while( i < data.powerConsumers.length ){
                    link = "/sample/power-consumers/" + data.powerConsumers[i].id;
                    title = data.powerConsumers[i].supplyNumber;
                    ret.push( <li key={ i }><RouteLink to={ link } title={ title }>{ title }</RouteLink></li> );
                    i++;
                }

                ret = <ol className="person-power-consumers">{ ret }</ol>
            }

            return ret;
        },
    }),
    sample_suppliers: Object.freeze({
        website: website_view,
        powerStationsCount: sample_powerStationsCount_view,
        powerConsumersCount: sample_powerConsumersCount_view,
    }),
    sample_communities: Object.freeze({
        afm: afm_view,
        distinctive_titles: distinctive_titles_view,
        ...address_views,
    }),
    sample_power_stations: Object.freeze({
        installed_power: installed_power_view,
        supplier: sample_supplier_view,
        type: power_station_type_view,
        voltage_level: voltage_level_view,
        last_counting: last_counting_view,
        next_counting: next_counting_view,
        next_clearance: next_clearance_view,
        ...address_views,
    }),
    sample_power_consumers: Object.freeze({
        person: sample_person_view,
        voltage_level: voltage_level_view,
        agreed_power: agreed_power_view,
        supplier: sample_supplier_view,
        ...address_views,
    }),
    /*metrics_power_stations: Object.freeze({}),*/
});

export function SingleDataRequestsHandler( key, url_slug, emit_event, store_instance ){

    const api_url = "http://localhost:8085/api/v1/";

    const request_config = function(){ return { headers: { "Authorization" : "Bearer " + Cookie.get( "accessToken" ) } } };

    let pendingApiRequest = null;

    const data = {};

    function emit(id){
        store_instance.emit( emit_event, { fields: data[id], headers: TableHeadersSingle[ key ], values: TableValuesSingle[ key ], columns: TableColumnsSingle[ key ] } );
    }
    
    function on_success(response){

        if( response.data ){
            // console.log( response.data );
            const id = response.data.uuid || response.data.id;
            data[ id ] = response.data;
            emit( id );
        }
        else{
            // @todo: Could add some error message display.
        }

        pendingApiRequest = null;
    }

    function on_fail(error){

        if( !! error.response && 401 === error.response.status && "invalid_token" === JSON.parse( error.response.request.response ).error ){
            store_instance.authorization.refresh( function( response ){ executeRequest(); }, function(error){ window.location.reload(); });
        }
        else{
            pendingApiRequest = null;
        }
    }

    function executeRequest(){
        getRequest( pendingApiRequest, request_config(), false, on_success, on_fail );
    }

    return Object.freeze({
        request: function( id, type_list_reference ){

            if( void 0 !== data[ id ] ){
                emit( id );
            }
            else{

                if( null !== pendingApiRequest ){
                    console.warn("Request cancelled");
                    return;
                }

                if( !! type_list_reference && 'function' === typeof type_list_reference.getData ){

                    let listData = type_list_reference.getData();
                    let refTo = listData.list_map[ id ];

                    if( void 0 !== refTo ){
                        data[ id ] = listData.list[refTo];
                        emit( id );
                        return;
                    }
                }

                pendingApiRequest = api_url + url_slug;

                if( void 0 === Cookie.get("accessToken") ){
                    store_instance.authorization.refresh( function( response ){ executeRequest(); }, function(error){ window.location.reload(); });
                }
                else{
                    executeRequest();
                }
            }
        },
    });
}

export function ListDataRequestsHandler( key, url_slug, response_list_name, emit_event, store_instance ){

    const api_url = "http://localhost:8085/api/v1/";

    let pendingApiRequest = null;

    const request_config = function(){ return { headers: { "Authorization" : "Bearer " + Cookie.get( "accessToken" ) } } };

    const data_map = {};
    let data = null;

    function request_arguments( size, page, order ){

        let args = "";

        if( null !== size || null !== page || null !== order ){
            
            let merge_symbol = "?";

            if( size ){
                args += merge_symbol + "size=" + size;
                merge_symbol = "&";
            }

            if( page ){
                args += merge_symbol + "page=" + page;
                merge_symbol = "&";
            }

            if( order ){
                args += merge_symbol + "order=" + order;
                merge_symbol = "&";
            }
        }

        return args;
    }

    function emit( emit_list, emit_page ){
        store_instance.emit( emit_event, { list: emit_list, page: emit_page, headers: TableHeaders[key], values: TableValues[ key ], columns: TableColumns[key] } );
    }
    
    function on_success(response){

        if( response.data ){

            // console.log( response.data, response_list_name, response.data._embedded[ response_list_name ] );

            let list = null;

            if( void 0 !== response.data._embedded && void 0 !== typeof response.data._embedded && void 0 !== response.data._embedded[ response_list_name ] && void 0 !== typeof response.data._embedded[ response_list_name ] ){
                list = response.data._embedded[ response_list_name ];
            }
            else if( void 0 !== response.data[ response_list_name ] && void 0 !== typeof response.data[ response_list_name ] ){
                list = response.data[ response_list_name ];
            }

            let page = !! response.data.page ? response.data.page : null;

            if( list.length ){

                page = page || { size: list.length, number: 0, totalPages: 1, totalElements: list.length };

                let min_index = page ? page.number * page.size : 0;
                let max_index = page ? min_index + page.size - 1 : list.length - 1;

                let array_list = data ? data.list : [];
                let list_min_index = data ? data.min_index : Number.MAX_SAFE_INTEGER;
                let list_max_index = data ? data.max_index : Number.MIN_SAFE_INTEGER;

                let i = min_index;
                let x = 0;

                while( i <= max_index && void 0 !== list[x] ){
                    array_list[ i ] = list[ x ];
                    data_map[ array_list[i].uuid || array_list[i].id ] = i; // @todo: Should (somehow) set list items key ( 'id' or 'uuid' ).
                    i += 1;
                    x += 1;
                }

                data = {
                    list: array_list,
                    min_index: Math.min( min_index, list_min_index ),
                    max_index: Math.max( max_index, list_max_index ),
                    totalElements: page.totalElements,
                };
            }

            emit( list, page );
        }
        else{
            // @todo: Could add some error message display.
        }

        pendingApiRequest = null;
    }

    function on_fail(error){
        if( !! error.response && 401 === error.response.status && "invalid_token" === JSON.parse( error.response.request.response ).error ){
            store_instance.authorization.refresh( function( response ){ executeRequest(); }, function(error){ window.location.reload(); });
        }
        else{
            pendingApiRequest = null;
        }
    }

    function executeRequest(){
        getRequest( pendingApiRequest, request_config(), false, on_success, on_fail );
    }

    return Object.freeze({
        request: function( size, page, order ){

            if( null !== pendingApiRequest ){
                console.warn("Request cancelled");
                return;
            }

            size = !!! size ? null : size;
            page = !!! page ? null : page;
            order = !!! order ? null : order;

            if( null !== data ){

                let min_index = Math.max( 0, page * size );
                let max_index = min_index + size - 1;

                if( min_index >= data.min_index && max_index <= data.max_index ){

                    let first_index = min_index === data.min_index ? 0 : min_index - data.min_index;
                    let last_index = first_index + max_index - min_index;
                    let array_list = data.list.slice( first_index, last_index + 1 );
                    
                    let i = 0;
                    while( i < array_list.length && void 0 !== array_list[i] ){
                        i += 1;
                    }

                    if( i === array_list.length ){

                        let page_data = {
                            /*size: array_list.length,*/
                            size: size,
                            number: null,
                            totalPages: null,
                            totalElements: data.totalElements,
                        };

                        /*page_data.number = first_index / array_list.length;*/
                        /*page_data.number = first_index / page_data.size;*/
                        page_data.number = first_index / size;
                        page_data.number = 0 >= page_data.number ? 0 : page_data.number;

                        page_data.totalPages = Math.ceil( page_data.totalElements / size );

                        emit( array_list, page_data );

                        return;
                    }
                }
            }

            pendingApiRequest = api_url + url_slug + request_arguments( size, page, order );

            if( void 0 === Cookie.get("accessToken") ){
                store_instance.authorization.refresh( function( response ){ executeRequest(); }, function(error){ window.location.reload(); });
            }
            else{
                executeRequest();
            }
        },
        getData: function(){
            return { list_map : data_map , ...data };
        }
    });
}
