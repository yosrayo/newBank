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
    actionType : string;
    amount : number ;
    dateAction : Date;
	userTo : number;
	userFrom : number ;
	organizationTo : number ;
	reference:number;

}
