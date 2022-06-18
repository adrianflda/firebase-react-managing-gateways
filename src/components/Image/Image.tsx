import { useEffect, useState } from "react";
import { storage } from '../../services/index';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { Avatar, Badge, IconButton, styled } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';

const Input = styled('input')({
    display: 'none',
});

function Image({ editable, imageRoute, imageName, size = 50 }: { editable: boolean, imageRoute: string, imageName: string, size?: number }) {
    const user = useSelector((state: RootState) => state.user);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [progressPercent, setProgressPercent] = useState(0);
    const storageRef = user && ref(storage, `usersMedia/${user.uid}/${imageRoute}/${imageName}`);

    useEffect(() => {
        setProgressPercent(0);
        if (user && imageRoute && storageRef) {
            if (!imgUrl) {
                getDownloadURL(storageRef).then((downloadURL) => {
                    setImgUrl(downloadURL);
                }).catch((error) => {
                    console.info(error);
                });
            }
        }
    }, [user, imageRoute, imageName, storageRef, imgUrl]);

    if (!user) {
        return <>Not user found</>;
    }

    const handleChange = (event: any) => {
        const file = event.target.files[0];
        if (!file || !storageRef) return;
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    }

    const AvatarEditAction = () => (
        <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} />
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    );

    return (
        <Badge
            overlap="circular"
            badgeContent={
                editable ? <AvatarEditAction /> : <></>
            }
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Badge
                overlap="circular"
                badgeContent={
                    progressPercent > 0 ? `${progressPercent}%` : <></>
                }
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Avatar
                    alt="Gateway Image"
                    src={imgUrl}
                    sx={{ width: size + 20, height: size + 20 }}
                >
                    <RouterOutlinedIcon sx={{ fontSize: size }} />
                </Avatar>

            </Badge>
        </Badge >
    );
}
export default Image;