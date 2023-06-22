import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { getSignature } from '../../store/auth/actions';

const Signature = () => {
    const dispatch = useDispatch();
    dispatch(getSignature());
    const username = useSelector((state) => state.auth.user.name);
    const signature = useSelector((state) => state.auth.signature);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
            }}
        >
            <Typography component="h5" color="primary" variant="h5">
                SIGNATURE
            </Typography>

            <Box
                sx={{
                    my: 2,
                    bgcolor: "primary.main",
                    borderRadius: "2px",
                    py: 4,
                    px: 8
                }}
                align='center'
            >
                <Typography
                    color="secondary"
                    variant="h2"
                    component="h2"
                    align="center"
                >
                    {signature}
                </Typography>
            </Box>

            <Typography
                color="primary"
                variant="subtitle2"
                sx={{ my: 1 }}
                align="center"
                paragraph
            >
                User: {username}
            </Typography>
        </Box>
    )
}

export default Signature;