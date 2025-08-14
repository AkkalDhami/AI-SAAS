import { getAllPublishedCreations, getUserCreationsByUserId, updateCreationLikes } from "../services/aiServices.js";

export const getUserCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        // const user = await clerkClient.users.getUser(userId);
        const creations = await getUserCreationsByUserId(userId);
        res.json({
            success: true,
            data: {
                user,
                creations
            }
        })
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

export const getPublishedCreation = async (req, res) => {
    try {
        const creations = await getAllPublishedCreations();
        res.json({
            success: true,
            data: creations
        })
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: error.message
        });

    }
}

export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body
        const creation = await getUserCreationsByUserId(userId)
        if (!creation) {
            return res.status(404).json({
                success: false,
                message: "Creation not found"
            });
        }

        const currentLikes = creation.likes
        const userIdStr = userId.toString();
        let updatedLikes, message;

        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter(id => id !== userIdStr);
            message = "Creation unliked successfully";
        } else {
            updatedLikes = [...currentLikes, userIdStr];
            message = "Creation liked successfully";
        }

        const formattedArray = `[${updatedLikes.join(', ')}]`;

        await updateCreationLikes(id, formattedArray);
        res.json({
            success: true,
            message
        })

    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: error.message
        });

    }
}