import { type UserProfileDTO } from '../dto/create-profile.dto';
import type { ProfilesServices } from '../profiles.service';
export declare class CreateProfileController {
    private profileService;
    constructor(profileService: ProfilesServices);
    create(body: UserProfileDTO): Promise<void>;
}
