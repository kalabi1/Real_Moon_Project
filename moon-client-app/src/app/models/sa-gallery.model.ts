export class SaGallery {
    galleryNo: number;
    activeStat: number;
    slNo: number;
    galleryTitle: string;
    galleryDescr: string;
    galleryPhotoName: string;
    companyNo: number;    
    ssCreatedOn: Date;
    ssCreator: number;
    ssModifiedOn: Date;
    ssModifier: number;
    constructor(options: any = {}) {
        this.galleryNo = options.galleryNo || null;
        this.activeStat = options.activeStat || null;
        this.slNo = options.slNo || null;
        this.companyNo = options.companyNo || null;
        this.galleryTitle = options.galleryTitle || '';
        this.galleryDescr = options.galleryDescr || '';
        this.galleryPhotoName = options.galleryPhotoName || '';
        this.ssCreator = options.ssCreator || null;
        this.ssCreatedOn = options.ssCreatedOn ? new Date(options.ssCreatedOn) : null;
        this.ssModifier = options.ssModifier || null;
        this.ssModifiedOn = options.ssModifiedOn ? new Date(options.ssModifiedOn) : null;
    }
}