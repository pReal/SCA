export class TeammateSchedule {
    teammateName: string;
    teammateType: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;

    constructor(teammateName: string,
        teammateType: string,
        monday: string,
        tuesday: string,
        wednesday: string,
        thursday: string,
        friday: string,
        saturday: string,
        sunday: string) {

            this.teammateName = teammateName;
            this.teammateType = teammateType;
            this.monday       = monday;
            this.tuesday      = tuesday;
            this.wednesday    = wednesday;
            this.thursday     = thursday;
            this.friday       = friday;
            this.saturday     = saturday;
            this.sunday       = sunday;
}
}
