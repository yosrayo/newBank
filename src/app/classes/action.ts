import { Organisation } from "./organisation";

enum ActionType {

	ALIMENTATION_compte_et_RECU_paiement ,
	
	Paiement_MARCHAND ,
	
	Recharge_TELEPHONIQUE,
	
	Paiement_FACTURE,
	
	Virement_BANCAIRE
}

export class Action {
    idAction : number ;
    action_type : string;
    amount : number ;
    date_action : Date;
	userTo : number;
	userFrom : number ;
	organizationTo : number ;
	reference:number;
	payed : number;

}
