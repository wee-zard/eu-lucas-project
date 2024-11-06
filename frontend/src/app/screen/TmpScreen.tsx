import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { fetchImage, getRandomImages } from '../../api/command/imageCommand';
import ImageRequest from '../../model/ImageRequest';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageModel from '../../model/ImageModel';
import { CircularProgress } from '@mui/material';

const TmpScreen = () => {

    const [imagePath, setImagePath] = useState<string[]>([]);
    const [imageModel, setImageModel] = useState<ImageModel[]>([]);
    const [fetchingSite, setFetchingSite] = useState<boolean>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [startDate, setDate] = useState<Date>(new Date());

    useEffect(() => {
        if (fetchingSite !== undefined) {
            fetchData(fetchingSite);
        }
    }, [fetchingSite]);

    useEffect(() => {
        if (imagePath.length > 0) {
            console.log(`Start time: ${startDate.toISOString()}
            \nFinish time: ${new Date().toISOString()}
            \nDifference: ${new Date().getTime() - startDate.getTime()} ms`);
        }
    }, [imagePath])

    const fetchData = (isImageFromLocalEnvironment: boolean) => {
        getRandomImages((data) => {
            const imageRequests: ImageRequest[] = data.map(value => ({
                year: value.year.year,
                countryCode: value.country.countryCode,
                longitude: value.gpsLongitudeCircle.toString(),
                latitude: value.gpsLatitudeCircle.toString(),
                imageName: value.imageName,
                isImageFromLocalEnvironment: isImageFromLocalEnvironment,
            }));
            fetchImage(imageRequests, (result) => {
                setImagePath(result);
                setFetchingSite(undefined);
                setImageModel(data);
                setLoading(false);
            });
        });
    }

    return (
        <React.Fragment>
            <div style={{display: "grid", gap: "16px"}}>
                <div style={{display: "flex", gap: "16px"}}>
                    <Button variant="outlined" onClick={() => {
                        setFetchingSite(false);
                        setLoading(true);
                        setImageModel([]);
                        setImagePath([]);
                        setDate(new Date());
                    }}>
                        Fetch Local Images (x9)
                    </Button>
                    <Button variant="outlined" onClick={() => {
                        setFetchingSite(true);
                        setLoading(true);
                        setImageModel([]);
                        setImagePath([]);
                        setDate(new Date());
                    }}>
                        Fetch Remote Images (x9)
                    </Button>
                </div>
                <div>
                    { isLoading ? <CircularProgress size={48}/> : null}
                </div>
                <div
                    style={{ 
                        display: "grid", 
                        gap: "16px",
                        gridTemplateColumns: "repeat(3, 1fr)"
                    }}
                >
                    { imagePath.map((value, index) => (
                        <div key={index}>

                            <Card sx={{ maxWidth: 345, "& .MuiCardContent-root" : {
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                            }}}
                            >
                                <CardContent>
                                    <img src={value} alt="logo2" height={250} style={{borderRadius: "4px"}} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {imageModel[index].imageName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <div>Year: {imageModel[index].year.year}</div>
                                        <div>Country: {imageModel[index].country.countryName}</div>
                                        <div>Longitude: {imageModel[index].gpsLongitudeCircle}</div>
                                        <div>Latitude: {imageModel[index].gpsLatitudeCircle}</div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

        </React.Fragment>
    )
};

export default TmpScreen;