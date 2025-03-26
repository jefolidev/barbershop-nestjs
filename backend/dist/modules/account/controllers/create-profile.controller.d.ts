import type { ProfilesServices } from '../accounts.service';
import { type UserProfileDTO } from '../dto/create-profile.dto';
export declare class CreateProfileController {
    private profileService;
    constructor(profileService: ProfilesServices);
    create(body: UserProfileDTO): Promise<void>;
}
