import React, { useEffect, useState, ReactNode, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    TextField
    } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';


//TODO Popup erstellt schwarzen hintergrund und rendered alle Children centered {props.children} "React Props Type with Children interface"  "event.stopPropagation"


interface PopupProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const CloseButton = styled(IconButton)`
  color: ${props => props.theme|| '#9e9e9e'};
`;


const StyledCard = styled(Card)`
  max-width: 500px;
  width: 90%; // Use percentage for better responsiveness
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin: 20px;

  @media (max-width: 600px) {
    width: 95%;
    margin: 10px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 0;
`;

const StyledCardContent = styled(CardContent)`
  padding: 20px 24px;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;


const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children}) => {
    if(!isOpen) return null;

      const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
      };

    return (
    <Overlay
      $isOpen={isOpen}
      onClick={onClose}
    >
<StyledCard onClick={handleCardClick}>
        <CardHeader>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </CardHeader>

        <StyledCardContent>
          {children}
        </StyledCardContent>
          <CardActions>
            <Button size="small" onClick={onClose}>Cancel</Button>
            <Button size="small" color="primary">Save</Button>
          </CardActions>
      </StyledCard>
    </Overlay>
  );
};



export default Popup;


/*
                <Button
                  isOpen="contained"
                  color="primary"
                  onClick={fetchEmployees}
                  disabled={loading}
                >
                  New Employee
                </Button>
                <Popup //TODO Popup erstellt schwarzen hintergrund und rendered alle Children centered {props.children} "React Props Type with Children interface"  "event.stopPropagation"
                  isOpen={isNewEmployeePopupOpen}
                >
                  <Card>
                   //TODOÜ Input
                   </Card>
                </Popup>

*/